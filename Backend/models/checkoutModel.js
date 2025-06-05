const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  userName: { type: String },
  userEmail: { type: String },
  hotelName: { type: String },
  hotelLocation: { type: String },
  images: { type: String, required: true },
  guests: { type: Number, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  paymentStatus: { type: String, default: 'pending' },
  paymentId: { type: String },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Checkout', checkoutSchema);
