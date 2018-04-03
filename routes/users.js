const express = require('express');
const controller = require('../controllers');
const router = express.Router();

router.post('/signup', controller.users.signup);
router.post('/login', controller.users.login);
router.get('/:id', controller.users.getUserById);
router.get('/:loc', controller.users.getUsersByLoc);
router.patch('/:id', controller.users.updateUser);

module.exports = router;
