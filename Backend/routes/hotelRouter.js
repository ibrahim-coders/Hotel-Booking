const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { hotels, getHotels } = require('../controllers/hotelsController');

router.post('/', verifyToken, hotels);
router.get('/', getHotels);
module.exports = router;
