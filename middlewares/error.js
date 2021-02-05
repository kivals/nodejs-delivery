const logger = require('../lib/logger');
const ApiError = require('../lib/api-error');

module.exports.apiErrorHandler = (err, req, res, next) => {
  logger.error(err);
  let errorMessage = 'Internal server error';
  let status = 500;
  if (err instanceof ApiError) {
    errorMessage = err.message;
    status = err.code;
  }
  res.status(status).json({
    error: errorMessage,
    status: 'error',
  });
};
