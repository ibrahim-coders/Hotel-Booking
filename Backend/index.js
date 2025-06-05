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

app.use('/api/user/', require('./routes/auth'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/hotels', require('./routes/hotelRouter'));
app.use('/api/hotels', require('./routes/hotelRouter'));
app.use('/api/hotel', require('./routes/hotelRouter'));
app.use('/api/hotels', require('./routes/hotelRouter'));
app.use('/api/stripe', require('./routes/hotelRouter'));
app.use('/api/checkout/:id', require('./routes/checkoutRouter'));
app.use('/api/checkout', require('./routes/checkoutRouter'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
