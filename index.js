const mongoose = require('mongoose');
const app = require('./app');
const logger = require('./lib/logger');
const config = require('./config');
const socket = require('./lib/socket');

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDD');
  // mongoose.set('debug', true);
  const server = app.listen(config.port, () => {
    logger.info(`Server is running on ${config.port} port`);
  });

  socket(server);
});
