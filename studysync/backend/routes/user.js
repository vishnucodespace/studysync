const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');  // ✅ Correct import
const User = require('../models/User');  // ✅ Ensure User model is correctly imported

// GET Profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE Profile
router.put('/profile', auth, async (req, res) => {
  const { name } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { name }, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;  // ✅ Ensure this is the only export
