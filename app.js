const express = require('express');
const routes = require('./routes');
const { apiErrorHandler } = require('./middlewares/error');
const logger = require('./middlewares/logger');

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use('/api', routes);

app.use(apiErrorHandler);

module.exports = app;
