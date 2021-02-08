const ApiError = require('../lib/api-error');

const validate = (schema) => (req, res, next) => {
  console.log(req.body);
  console.log(req.files);
  const { error, value } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((e) => e.message).join(',');
    return next(ApiError.badRequest(errorMessage));
  }
  req.body = value;
  return next();
};

module.exports = validate;
