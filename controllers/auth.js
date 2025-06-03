const User = require('../models/User');
const { verifyTelegramData } = require('../services/telegram');

async function getOrCreateUser(telegramData) {
  const { id, first_name, last_name, username, photo_url } = telegramData.user;
  
  // Verify Telegram data
  if (!verifyTelegramData(telegramData)) {
    throw new Error('Invalid Telegram data');
  }

  let user = await User.findOne({ telegramId: id.toString() });
  
  if (!user) {
    user = new User({
      telegramId: id.toString(),
      firstName: first_name,
      lastName: last_name,
      username,
      photoUrl: photo_url
    });

    // Check for referral
    if (telegramData.start_param) {
      const referrer = await User.findOne({ referralCode: telegramData.start_param });
      if (referrer) {
        user.referredBy = referrer._id;
        
        // Credit referrer
        referrer.referrals.push({
          userId: user._id,
          name: `${first_name} ${last_name}`,
          amount: 100
        });
        referrer.referralCount += 1;
        referrer.referralEarnings += 100;
        referrer.balance += 100;
        await referrer.save();
      }
    }

    await user.save();
  }

  return user;
}

module.exports = { getOrCreateUser };
