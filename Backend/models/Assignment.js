const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  task: { type: String }, // Make this optional
  fileUrl: { type: String }, // URL or path to the uploaded file
  fileName: { type: String }, // Original filename
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
