// backend/routes/events.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Event = require('../models/Event');

// Create event
router.post('/', auth, async (req, res) => {
  const { title, date, description } = req.body;
  try {
    const event = new Event({ title, date, description, createdBy: req.user.id });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'name');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;