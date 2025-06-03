const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  taskType: { 
    type: String, 
    required: true,
    enum: ['daily_bonus', 'telegram', 'twitter', 'retweet', 'referral']
  },
  completedAt: { type: Date, default: Date.now },
  reward: { type: Number, required: true }
}, { timestamps: true });

// Compound index to prevent duplicate task completions per day
taskSchema.index({ 
  userId: 1, 
  taskType: 1, 
  completedAt: { 
    $gte: new Date(new Date().setHours(0, 0, 0, 0)),
    $lt: new Date(new Date().setHours(23, 59, 59, 999))
  }
}, { unique: true });

module.exports = mongoose.model('Task', taskSchema);
