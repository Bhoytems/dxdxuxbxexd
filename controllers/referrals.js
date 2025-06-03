const User = require('../models/User');

async function getReferralInfo(userId) {
  const user = await User.findById(userId)
    .populate('referrals.userId', 'firstName lastName username')
    .populate('referredBy', 'firstName lastName username');

  if (!user) throw new Error('User not found');

  return {
    referralCode: user.referralCode,
    referredBy: user.referredBy,
    referrals: user.referrals,
    referralCount: user.referralCount,
    referralEarnings: user.referralEarnings
  };
}

module.exports = { getReferralInfo };
