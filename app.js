const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const { apiErrorHandler } = require('./middlewares/error');
const logger = require('./middlewares/logger');
const session = require('./middlewares/session');
const passport = require('./lib/passport');
const ApiError = require('./lib/api-error');

const app = express();
// set security HTTP headers
// app.use(helmet());
// parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: false }));
// parse json request body
app.use(bodyParser.json());
// enable cors
app.use(cors());
app.use(logger);
app.use(session);
app.use(passport.initialize());
app.use(express.static(`${__dirname}/uploads`));
app.use('/api', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(ApiError.notFound('Not found'));
});
// error handler
app.use(apiErrorHandler);

module.exports = app;
