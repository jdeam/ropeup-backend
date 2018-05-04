const express = require('express');
const controller = require('../controllers');
const authorize = require('./authMiddleware');
const router = express.Router();

router.get('/', authorize, controller.gyms.getNearbyGyms);

module.exports = router;