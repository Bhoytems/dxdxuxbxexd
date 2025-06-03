const User = require('../models/User');

async function getLeaderboard(limit = 100) {
  return User.find({})
    .sort({ balance: -1 })
    .limit(limit)
    .select('firstName lastName username balance photoUrl');
}

module.exports = { getLeaderboard };
