const Checkout = require('../models/checkoutModel');

const checkOut = async (req, res) => {
  try {
    const checkout = new Checkout(req.body);
    await checkout.save();
    res.status(201).json({ message: 'Booking successful', checkout });
  } catch (error) {
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
};

module.exports = { checkOut };
