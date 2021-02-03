require('dotenv').config();

module.exports = {
  port: process.env.APP_PORT || 3000,
  host: process.env.HOST || '127.0.0.1',
  logger: {
    level: process.env.NODE_ENV !== 'production' ? 'verbose' : 'info',
  },
};
