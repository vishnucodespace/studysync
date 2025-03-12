const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Group = require('../models/Group');
const Resource = require('../models/Resource');
const Event = require('../models/Event');
const Job = require('../models/Job');

// Search (Updated to POST and match Search.jsx)
router.post('/', auth, async (req, res) => {
  const { query } = req.body; // Changed from GET with query param to POST
  try {
    const users = await User.find({ name: new RegExp(query, 'i') }).select('-password');
    const groups = await Group.find({ name: new RegExp(query, 'i') });
    const resources = await Resource.find({ title: new RegExp(query, 'i') });
    const events = await Event.find({ title: new RegExp(query, 'i') });
    const jobs = await Job.find({ title: new RegExp(query, 'i') });

    const results = [
      ...users.map(user => ({
        id: user._id,
        type: 'user',
        name: user.name,
        description: user.college || 'No college specified',
      })),
      ...groups.map(group => ({
        id: group._id,
        type: 'group',
        name: group.name,
        description: group.description,
      })),
      ...events.map(event => ({
        id: event._id,
        type: 'event',
        name: event.title,
        description: event.description || 'No description',
      })),
    ];
    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;