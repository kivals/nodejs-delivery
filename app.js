const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { apiErrorHandler } = require('./middlewares/error');
const logger = require('./middlewares/logger');
const session = require('./middlewares/session');
const passport = require('./lib/passport');

const app = express();

// parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: false }));
// parse json request body
app.use(bodyParser.json());
app.use(logger);
app.use(session);
app.use(passport.initialize());
app.use('/api', routes);

// error handler
app.use(apiErrorHandler);

module.exports = app;
