const express = require('express');
const controller = require('../controllers');
const router = express.router();

router.post('/signup', controller.users.signup);
router.post('/login', controller.users.login);

module.exports = router;
