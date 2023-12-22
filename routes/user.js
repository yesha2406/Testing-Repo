var express = require('express');
var router = express.Router();

const UserController = require('../controller/user');

/* Task Routes */
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserDataByPk);

module.exports = router;
