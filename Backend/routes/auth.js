const express = require('express');
const router = express.Router();

const {
  register,
  login,
  logout,
  upDateUser,
  changePassword,
  upDateUserImage,
} = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');
const getUserInfo = require('../controllers/getUserInfo');
const custemrs = require('../middleware/custemrs');

router.patch('/updateImage', verifyToken, upDateUserImage);
router.patch('/updateUser', verifyToken, upDateUser);
router.patch('/change-password', verifyToken, changePassword);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/userInfo', verifyToken, getUserInfo);

module.exports = router;
