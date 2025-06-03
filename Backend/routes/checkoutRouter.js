const express = require('express');
const router = express.Router();
const custemrs = require('../middleware/custemrs');
const { checkOut } = require('../controllers/checkOut');
// Create a new checkout/booking
router.post('/', checkOut, custemrs);

module.exports = router;
