const ApiError = require('../lib/api-error');

module.exports = (req, res, next) => {
  if (!req.user) {
    return next(ApiError.unAuthorized('User is not authenticated'));
  }
  return next();
};
