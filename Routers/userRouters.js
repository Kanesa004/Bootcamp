const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');

router.get('/', userController.getUser);

module.exports = router;
