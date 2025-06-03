const express = require('express');
const router = express.Router();
const { claimDailyBonus, completeTask } = require('../controllers/tasks');

router.post('/daily-bonus', async (req, res) => {
  try {
    const user = await claimDailyBonus(req.body.userId);
    res.json({ success: true, balance: user.balance });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/complete', async (req, res) => {
  try {
    const user = await completeTask(req.body.userId, req.body.taskType);
    res.json({ success: true, balance: user.balance });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
