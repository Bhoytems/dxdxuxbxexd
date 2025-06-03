const express = require('express');
const router = express.Router();
const { getReferralInfo } = require('../controllers/referrals');

router.get('/:userId', async (req, res) => {
  try {
    const data = await getReferralInfo(req.params.userId);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
