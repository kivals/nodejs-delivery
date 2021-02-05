const logger = require('../lib/logger');
const ApiError = require('../lib/api-error');

module.exports.apiErrorHandler = (err, req, res, next) => {
  logger.error(err);

  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
    return;
  }
  res.status(500).json('Internal server error');
};
