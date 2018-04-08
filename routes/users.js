const express = require('express');
const controller = require('../controllers');
const authorize = require('./authMiddleware');
const router = express.Router();

router.get('/', authorize, controller.users.getUsers);
router.patch('/:id', authorize, controller.users.updateUser);

router.get('/:id/schedule', authorize, controller.schedules.getScheduleByUserId);
router.post('/:id/schedule', authorize, controller.schedules.addScheduleItem);
router.delete('/:id/schedule/:itemId', authorize, controller.schedules.deleteScheduleItem);

module.exports = router;
