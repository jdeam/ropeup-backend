const express = require('express');
const controller = require('../controllers').users;
const authorize = require('./authMiddleware');
const router = express.Router();

router.get('/', authorize, controller.getUsers);
router.patch('/:id', authorize, controller.updateUser);
router.get('/:id/schedule', authorize, controller.getScheduleByUserId);
router.post('/:id/schedule', authorize, controller.addScheduleItem);
router.delete('/:id/schedule/:itemId', authorize, controller.deleteScheduleItem);

module.exports = router;
