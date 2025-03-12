const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Group = require('../models/Group');

// Create a new study group
router.post('/create', auth, async (req, res) => {
  const { name, description } = req.body;
  try {
    const group = new Group({
      name,
      description,
      creator: req.user.id,
      admin: req.user.id,
      members: [req.user.id],
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
    if (!group) return res.status(404).json({ message: 'Group not found' });
    if (group.members.includes(req.user.id)) {
      return res.status(400).json({ message: 'You are already a member of this group' });
    }
    group.members.push(req.user.id);
    await group.save();
    res.json(group);
  } catch (error) {
    console.error('Join group error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add member (admin only)
router.post('/:id/add-member', auth, async (req, res) => {
  const { userId } = req.body;
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: 'Group not found' });
    if (group.admin.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only admin can add members' });
    }
    if (group.members.includes(userId)) {
      return res.status(400).json({ message: 'User is already a member' });
    }
    group.members.push(userId);
    await group.save();
    res.json(group);
  } catch (error) {
    console.error('Add member error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove member (admin only)
router.post('/:id/remove-member', auth, async (req, res) => {
  const { userId } = req.body;
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: 'Group not found' });
    if (group.admin.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only admin can remove members' });
    }
    group.members = group.members.filter(member => member.toString() !== userId);
    await group.save();
    res.json(group);
  } catch (error) {
    console.error('Remove member error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all groups
router.get('/', auth, async (req, res) => {
  try {
    const groups = await Group.find()
      .populate('creator', 'name')
      .populate('admin', 'name');
    res.json(groups.map(group => ({
      id: group._id,
      name: group.name,
      description: group.description,
      creator: group.creator?.name || 'Unknown', // Fallback if creator is not populated
      admin: group.admin?.name || 'Unknown', // Fallback if admin is not populated
      memberCount: group.members.length,
    })));
  } catch (error) {
    console.error('Get groups error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get group details
router.get('/:id', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate('creator', 'name')
      .populate('admin', 'name')
      .populate('members', 'name')
      .populate('messages.sender', 'name');
    if (!group) return res.status(404).json({ message: 'Group not found' });
    if (!group.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'You are not a member of this group' });
    }
    res.json(group);
  } catch (error) {
    console.error('Get group details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;