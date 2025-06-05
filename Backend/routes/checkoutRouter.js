const express = require('express');
const router = express.Router();
const custemrs = require('../middleware/custemrs');
const { checkOut, getCheckout } = require('../controllers/checkOut');

router.post('/', checkOut, custemrs);
router.get('/', getCheckout, custemrs);

module.exports = router;
