var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT;

// Import routes

var app = express();

//Connect mongoose
global._MONGO = mongoose.connect(process.env.MONGO_URI);
// global.IO = io;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Global variables
global._UTIL = require('./utils/helper');
global._MESSAGES = require('./config/messagesConfig');
global._CONSTANT = require('./config/constantsConfig');
global._RESPONSE = require('./utils/responseHelper');

// Applied isSignedIn middleware
const Auth = require('./utils/middleware/authMiddleware');
app.all(`/api${process.env.BASE_URL_V1}/*`, [Auth.isSignedIn]);
// Imported all routes
const routes = require('./routes')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
