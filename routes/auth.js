const express = require('express');
const router = express.Router();
const { getOrCreateUser } = require('../controllers/auth');

router.post('/login', async (req, res) => {
  try {
    const user = await getOrCreateUser(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
