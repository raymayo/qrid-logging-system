const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Student = require('./Student.cjs'); // Import Student model

// Define the log schema
const logSchema = new Schema({
  studentInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Reference to the Student model
    required: true
  },
  logAt: { type: Date, default: Date.now },
  logoutAt: { type: Date, default: null }
});

// Create the Log model
const Log = mongoose.model('Log', logSchema);

module.exports = Log;
