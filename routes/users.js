const express = require('express');
const controller = require('../controllers').users;
const authorize = require('./authMiddleware');
const router = express.Router();

router.get('/:id', authorize, controller.getUserById);
router.get('/:zip', authorize, controller.getUsersByZip);
router.patch('/:id', authorize, controller.updateUser);
router.get('/', authorize, controller.getUserByToken);

module.exports = router;
