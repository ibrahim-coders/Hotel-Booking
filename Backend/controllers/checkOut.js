const Checkout = require('../models/checkoutModel');

const checkOut = async (req, res) => {
  try {
    const { paymentId } = req.body;
    if (paymentId) {
      const exists = await Checkout.findOne({ paymentId });
      if (exists) {
        return res
          .status(200)
          .json({ message: 'Already booked', checkout: exists });
      }
    }

    const checkout = new Checkout(req.body);
    await checkout.save();
    res.status(201).json({ message: 'Booking successful', checkout });
  } catch (error) {
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
};

const getCheckout = async (req, res) => {
  try {
    const { userEmail } = req.query;
    if (!userEmail) {
      return res.status(400).json({ message: 'User email is required' });
    }

    const bookings = await Checkout.find({ userEmail });
    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: 'No bookings found for this user' });
    }

    res.status(200).json({ bookings });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to get bookings', error: error.message });
  }
};

module.exports = { checkOut, getCheckout };
