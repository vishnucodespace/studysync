// backend/routes/resources.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Resource = require('../models/Resource');

// Upload resource
router.post('/', auth, async (req, res) => {
  const { title, url } = req.body;
  try {
    const resource = new Resource({ title, url, uploadedBy: req.user.id });
    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get resources
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.find().populate('uploadedBy', 'name');
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;