const express = require('express');
const controller = require('../controllers');
const router = express.Router();

router.post('/signup', controller.auth.signup);
router.post('/login', controller.auth.login);

module.exports = router;
