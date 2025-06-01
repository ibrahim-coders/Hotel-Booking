const Hotels = require('../models/hotelModels');

// Add a new hotel
const hotels = async (req, res) => {
  const { name, location, price, featured, images, description } = req.body;
  try {
    if (!name || !location || !price || !featured || !images || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const hotel = new Hotels({
      name,
      location,
      price,
      featured,
      images,
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
  try {
    const hotels = await Hotels.find();
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
  const { location } = req.query;
  try {
    const hotel = await Hotels.find({
      location: { $regex: location, $options: 'i' },
    });
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  hotels,
  getHotels,
  hotelsDeteails,
  getFeaturedHotels,
  searchQuery,
};
