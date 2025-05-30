const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');
const getUserInfo = require('../controllers/getUserInfo');
const { hotels } = require('../controllers/hotelsController');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/userInfo', verifyToken, getUserInfo);
router.post('/hotels', verifyToken, hotels);
module.exports = router;
