// backend/routes/search.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Group = require('../models/Group');
const Resource = require('../models/Resource');
const Event = require('../models/Event');
const Job = require('../models/Job');

router.get('/', auth, async (req, res) => {
  const { q } = req.query;
  try {
    const users = await User.find({ name: new RegExp(q, 'i') }).select('-password');
    const groups = await Group.find({ name: new RegExp(q, 'i') });
    const resources = await Resource.find({ title: new RegExp(q, 'i') });
    const events = await Event.find({ title: new RegExp(q, 'i') });
    const jobs = await Job.find({ title: new RegExp(q, 'i') });

    res.json({ users, groups, resources, events, jobs });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;