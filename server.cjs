const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import models
const Student = require('./src/models/Student.cjs'); 
const Log = require('./src/models/Log.cjs'); 

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

// Routes
app.post('/api/users', createUser);
app.post('/api/scan', createLog);
app.get('/api/admin', getLogs);
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

// Start server
const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
