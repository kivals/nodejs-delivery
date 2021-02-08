const express = require('express');
const routes = require('./routes');
const { apiErrorHandler } = require('./middlewares/error');
const logger = require('./middlewares/logger');
const session = require('./middlewares/session');
const passport = require('./lib/passport');

const app = express();

// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(session);
app.use(passport.initialize());
app.use('/api', routes);

// error handler
app.use(apiErrorHandler);

module.exports = app;
