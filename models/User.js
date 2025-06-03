const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  username: String,
  photoUrl: String,
  balance: { type: Number, default: 0 },
  lastBonusClaim: Date,
  referralCode: { type: String, unique: true, default: uuidv4 },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  referrals: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    date: { type: Date, default: Date.now },
    amount: { type: Number, default: 100 }
  }],
  referralCount: { type: Number, default: 0 },
  referralEarnings: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Indexes for better performance
userSchema.index({ telegramId: 1 });
userSchema.index({ referralCode: 1 });
userSchema.index({ balance: -1 });

module.exports = mongoose.model('User', userSchema);
