const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const Admin = require('./src/models/Admin.cjs'); // Path to your Admin model

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' })); // Adjust origin as needed

// MongoDB connection
mongoose
  .connect('mongodb://127.0.0.1:27017/qr-id', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Admin login route
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    // Admin successfully logged in
    res.status(200).json({ success: true, message: 'Admin logged in successfully' });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Import models
const Student = require('./src/models/Student.cjs');
const Log = require('./src/models/Log.cjs');

// Other routes
app.post('/api/users', createUser);
app.post('/api/scan', createLog);
app.get('/api/admin/logs', getLogs); // Updated to prevent route collision
app.get('/api/students', getStudents);
app.get('/api/users/:studentNo', getUserByStudentNo);

// Route handlers
async function createUser(req, res) {
  const { studentNo, studentName, studentYear, studentCourse } = req.body;

  try {
    const newUser = new Student({ studentNo, studentName, studentYear, studentCourse });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function createLog(req, res) {
  const { studentInfo, logAt } = req.body;

  if (!studentInfo || !logAt) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newLog = new Log({ studentInfo, logAt });
    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getStudents(req, res){
  try {
    const students = await Student.find();
    res.json(students)
  } catch (error){
    res.status(500).json({ message: error.message });
  }
}

async function getLogs(req, res) {
  try {
    const logs = await Log.find();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getUserByStudentNo(req, res) {
  const { studentNo } = req.params;

  try {
    const user = await Student.findOne({ studentNo });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Start the server
const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
