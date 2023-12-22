var express = require('express');
var router = express.Router();

const AuthController = require('../controller/auth');

/* User Routes */
router.post('/signup', AuthController.signup);
router.post('/signin', AuthController.signin);

module.exports = router;
