const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');
const Group = require('../models/Group');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Send message (private or group, with optional file)
router.post('/', auth, upload.single('file'), async (req, res) => {
  const { recipient, groupId, content } = req.body;
  try {
    let messageData = {
      sender: req.user.id,
      content,
      fileUrl: req.file ? `/uploads/${req.file.filename}` : null,
      readBy: [req.user.id],
    };

    if (groupId) {
      const group = await Group.findById(groupId);
      if (!group) return res.status(404).json({ message: 'Group not found' });
      if (!group.members.includes(req.user.id)) {
        return res.status(403).json({ message: 'You are not a member of this group' });
      }
      messageData.group = groupId;
    } else {
      messageData.recipient = recipient;
    }

    const message = new Message(messageData);
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get messages (private or group)
router.get('/', auth, async (req, res) => {
  const { recipient, groupId } = req.query;
  try {
    let messages;
    if (groupId) {
      messages = await Message.find({ group: groupId }).sort({ createdAt: -1 });
    } else {
      messages = await Message.find({
        $or: [
          { sender: req.user.id, recipient },
          { sender: recipient, recipient: req.user.id },
        ],
      }).sort({ createdAt: -1 });
    }
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;