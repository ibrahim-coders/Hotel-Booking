const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');
const getUserInfo = require('../controllers/getUserInfo');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/userInfo', verifyToken, getUserInfo);

module.exports = router;
