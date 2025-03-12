const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get all posts
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().select('name posts');
    const posts = users.flatMap(user =>
      user.posts.map(post => ({
        _id: post._id,
        content: post.content,
        imageUrl: post.imageUrl,
        timestamp: post.timestamp,
        likes: post.likes.length,
        likedByUser: post.likes.includes(req.user.id),
        user: { id: user._id, name: user.name },
      }))
    ).sort((a, b) => b.timestamp - a.timestamp);
    res.json(posts);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Like a post
router.post('/:postId/like', auth, async (req, res) => {
  try {
    const user = await User.findOne({ 'posts._id': req.params.postId });
    if (!user) return res.status(404).json({ message: 'Post not found' });
    const post = user.posts.id(req.params.postId);
    if (post.likes.includes(req.user.id)) {
      post.likes = post.likes.filter(id => id.toString() !== req.user.id);
    } else {
      post.likes.push(req.user.id);
    }
    await user.save();
    res.json({ likes: post.likes.length, likedByUser: post.likes.includes(req.user.id) });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;