const mongoose = require('mongoose');
const app = require('./app');
const logger = require('./lib/logger');
const config = require('./config');

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDD');
  // mongoose.set('debug', true);
  app.listen(config.port, () => {
    logger.info(`Server is running on ${config.port} port`);
  });
});
