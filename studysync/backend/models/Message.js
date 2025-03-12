const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // For private messages
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }, // For group messages
  content: { type: String }, // Text message
  fileUrl: { type: String }, // Optional file attachment
  timestamp: { type: Date, default: Date.now },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who have read the message
});

module.exports = mongoose.model('Message', MessageSchema);