const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const admin = require('../middleware/admin');
const {
  hotels,
  getHotels,
  hotelsDeteails,
  getFeaturedHotels,
  searchQuery,
  stripePayment,
  allHotels,
  deleteHotels,
  updateHotel,
} = require('../controllers/hotelsController');

router.post('/', verifyToken, hotels);
//hotel update

router.patch('/:id', verifyToken, admin, updateHotel);
// all holtels get by admin

router.get('/admin', verifyToken, admin, allHotels);
// hotel delete
router.delete('/:id', verifyToken, admin, deleteHotels);
router.get('/', getHotels);
router.get('/featured', getFeaturedHotels);
router.get('/search', searchQuery);
router.get('/:id', hotelsDeteails);
router.post('/payment', stripePayment);
module.exports = router;
