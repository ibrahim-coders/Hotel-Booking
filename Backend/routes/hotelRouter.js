const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {
  hotels,
  getHotels,
  hotelsDeteails,
  getFeaturedHotels,
  searchQuery,
  stripePayment,
} = require('../controllers/hotelsController');

router.post('/', verifyToken, hotels);
router.get('/', getHotels);
router.get('/featured', getFeaturedHotels);
router.get('/search', searchQuery);
router.get('/:id', hotelsDeteails);
router.post('/payment', stripePayment);
module.exports = router;
