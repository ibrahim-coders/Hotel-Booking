const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

//config
dotenv.config();
connectDB();
//middleware
const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

//router
app.use('/api', require('./routes/auth'));
app.use('/api/user/', require('./routes/auth'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/hotels', require('./routes/hotelRouter'));
//hotel data update
app.use('/api/updateHotel', require('./routes/hotelRouter'));
// single hotel deleted
app.use('/api/singleHotels', require('./routes/hotelRouter'));
// all holtels get by admin
app.use('/api/allhotels', require('./routes/hotelRouter'));
app.use('/api/hotels', require('./routes/hotelRouter'));
app.use('/api/hotel', require('./routes/hotelRouter'));
app.use('/api/hotels', require('./routes/hotelRouter'));
app.use('/api/stripe', require('./routes/hotelRouter'));
//all booking get
app.use('/api/allBooking', require('./routes/checkoutRouter'));
app.use('/api/checkout/:id', require('./routes/checkoutRouter'));
app.use('/api/checkout', require('./routes/checkoutRouter'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
