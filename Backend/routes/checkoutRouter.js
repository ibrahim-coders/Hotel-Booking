const express = require('express');
const router = express.Router();
const custemrs = require('../middleware/custemrs');
const admin = require('../middleware/admin');
const {
  checkOut,
  getCheckout,
  allBooking,
} = require('../controllers/checkOut');

router.post('/', checkOut, custemrs);
router.get('/', getCheckout, custemrs);
//all booking get
router.get('/', allBooking);

module.exports = router;
