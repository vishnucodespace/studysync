const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Resource = require('../models/Resource');
const multer = require('multer'); // Added for file upload

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Upload resource (Updated to handle file upload)
router.post('/', auth, upload.single('file'), async (req, res) => {
  const { title } = req.body;
  try {
    const resource = new Resource({
      title,
      url: `/uploads/${req.file.filename}`, // Store file path as URL
      uploadedBy: req.user.id,
    });
    await resource.save();
    res.status(201).json(resource);
  } catch (error) {
    console.error('Upload resource error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get resources
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.find().populate('uploadedBy', 'name');
    res.json(resources);
  } catch (error) {
    console.error('Get resources error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;