const express = require('express');
const routes = require('./routes');
const { errorHandler } = require('./middlewares/error');

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.use(errorHandler);

module.exports = app;
