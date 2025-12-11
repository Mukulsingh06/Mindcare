const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

router.get('/logs', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user.moodLogs || []);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/log', auth, async (req, res) => {
  const { mood, notes } = req.body;
  try {
    const user = await User.findById(req.userId);
    user.moodLogs.push({ date: new Date(), mood, notes: notes || '' });
    await user.save();
    res.json({ message: 'Mood saved' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving mood' });
  }
});

router.delete('/delete-history', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.moodLogs = [];
    await user.save();
    res.json({ message: 'Mood history deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting history' });
  }
});

module.exports = router;