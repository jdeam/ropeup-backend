const express = require('express');
const controller = require('../controllers').users;
const authorize = require('./authMiddleware');
const router = express.Router();

router.get('/', authorize, controller.getUsers);
router.get('/:id', authorize, controller.getUserById);
router.patch('/:id', authorize, controller.updateUser);

module.exports = router;
