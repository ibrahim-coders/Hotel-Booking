const Hotels = require('../models/hotelModels');

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

const getHotels = async (req, res) => {
  try {
    const hotels = await Hotels.find();
    res.status(200).json(hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { hotels, getHotels };
