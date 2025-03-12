// backend/routes/messages.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');

// Send message
router.post('/', auth, async (req, res) => {
  const { recipient, content } = req.body;
  try {
    const message = new Message({ sender: req.user.id, recipient, content });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get messages
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find({ $or: [{ sender: req.user.id }, { recipient: req.user.id }] })
      .populate('sender', 'name')
      .populate('recipient', 'name');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;