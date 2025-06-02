const express = require('express');
const router = express.Router();
const Checkout = require('../models/checkoutModel');
const custemrs = require('../middleware/custemrs');
// Create a new checkout/booking
router.post('/', custemrs, async (req, res) => {
  try {
    const checkout = new Checkout(req.body);
    await checkout.save();
    res.status(201).json({ message: 'Booking successful', checkout });
  } catch (error) {
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
});

module.exports = router;
