const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  college: String,
  moodLogs: [{ date: Date, mood: String, notes: String }]
});

module.exports = mongoose.model('User', userSchema);