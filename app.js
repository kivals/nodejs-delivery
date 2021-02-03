const express = require('express');
const routes = require('./routes');
const { errorHandler } = require('./middlewares/error');

const app = express();

app.use('/api', routes);

app.use(errorHandler);

module.exports = app;
