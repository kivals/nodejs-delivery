const app = require('./app');
const logger = require('./lib/logger');
const config = require('./config');

app.listen(config.port, config.host, () => {
  logger.info(`Server is running on ${config.host}:${config.port}`);
});
