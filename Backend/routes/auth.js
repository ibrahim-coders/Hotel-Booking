const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/User');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/userInfo', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
