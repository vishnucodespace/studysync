const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

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

// Follow User
router.post('/:id/follow', auth, async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);
    if (!userToFollow || currentUser._id.equals(userToFollow._id)) {
      return res.status(400).json({ message: 'Cannot follow' });
    }
    if (currentUser.following.includes(userToFollow._id)) {
      return res.status(400).json({ message: 'Already following' });
    }
    currentUser.following.push(userToFollow._id);
    userToFollow.followers.push(currentUser._id);
    await Promise.all([currentUser.save(), userToFollow.save()]);
    res.json({ message: 'Followed', followers: userToFollow.followers.length, following: currentUser.following.length });
  } catch (error) {
    console.error('Follow error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create Post
router.post('/post', auth, upload.single('image'), async (req, res) => {
  const { content } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const newPost = {
      content,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
    };
    user.posts.push(newPost);
    await user.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get User Profile (for View Profile)
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('following', 'name')
      .populate('followers', 'name');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;