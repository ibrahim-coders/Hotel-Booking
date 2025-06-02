const Hotels = require('../models/hotelModels');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

// Add a new hotel
const hotels = async (req, res) => {
  const {
    name,
    location,
    price,
    featured,
    images,
    rating,
    category,
    description,
  } = req.body;
  try {
    if (
      !name ||
      !location ||
      !price ||
      !featured ||
      !images ||
      !rating ||
      !category ||
      !description
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const hotel = new Hotels({
      name,
      location,
      price,
      featured,
      images,
      rating,
      category,
      description,
    });
    await hotel.save();
    res.status(201).json({ message: 'Hotel Add Successfully' });
  } catch (error) {
    console.error('Error adding hotel:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all hotels
const getHotels = async (req, res) => {
  const { location, category, sort } = req.query;
  let filter = {};
  let sortOption = {};

  if (location) filter.location = { $regex: location, $options: 'i' };
  if (category && category !== 'all') filter.category = category;

  if (sort === 'rating') sortOption.rating = -1;
  else if (sort === 'price-low') sortOption.price = 1;
  else if (sort === 'price-high') sortOption.price = -1;
  else if (sort === 'name') sortOption.name = 1;

  try {
    const hotels = await Hotels.find(filter).sort(sortOption);
    res.status(200).json(hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getFeaturedHotels = async (req, res) => {
  try {
    const hotels = await Hotels.find({
      featured: { $exists: true, $ne: [] },
    }).limit(4);
    res.status(200).json(hotels);
  } catch (error) {
    console.error('Error fetching featured hotels:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
// Get single hotel details by ID
const hotelsDeteails = async (req, res) => {
  const { id } = req.params;
  try {
    const hotel = await Hotels.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel Not Found' });
    }
    res.status(200).json(hotel);
  } catch (error) {
    console.error('Error fetching hotel details:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

//Search name query

const searchQuery = async (req, res) => {
  const { location, category, sort } = req.query;
  let filter = {};
  let sortOption = {};
  try {
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (category && category !== 'all') filter.category = category;

    // Sort logic
    if (sort === 'rating') sortOption.rating = -1;
    else if (sort === 'price-low') sortOption.price = 1;
    else if (sort === 'price-high') sortOption.price = -1;
    else if (sort === 'name') sortOption.name = 1;
    const hotels = await Hotels.find(filter).sort(sortOption);
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// payment

const stripePayment = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  hotels,
  getHotels,
  hotelsDeteails,
  getFeaturedHotels,
  searchQuery,
  stripePayment,
};
