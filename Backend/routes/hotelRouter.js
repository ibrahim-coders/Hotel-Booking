const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { hotels } = require('../controllers/hotelsController');

router.post('/', verifyToken, hotels);
module.exports = router;
