const express = require('express');
const router = express.Router();
const { getLeaderboard } = require('../controllers/leaderboard');

router.get('/', async (req, res) => {
  try {
    const leaderboard = await getLeaderboard();
    res.json(leaderboard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
