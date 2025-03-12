// backend/routes/groups.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // JWT authentication middleware
const Group = require('../models/Group');

// Create a new study group
router.post('/', auth, async (req, res) => {
  const { name } = req.body;
  try {
    // Create group with the authenticated user as the initial member
    const group = new Group({
      name,
      members: [req.user.id], // req.user.id comes from the auth middleware
    });
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    console.error('Create group error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Join an existing study group
router.post('/:id/join', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Check if user is already a member
    if (group.members.includes(req.user.id)) {
      return res.status(400).json({ message: 'You are already a member of this group' });
    }

    // Add user to the group
    group.members.push(req.user.id);
    await group.save();
    res.json(group);
  } catch (error) {
    console.error('Join group error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all groups the authenticated user is a member of
router.get('/', auth, async (req, res) => {
  try {
    const groups = await Group.find({ members: req.user.id });
    res.json(groups);
  } catch (error) {
    console.error('Get groups error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; // Export the router instance