const Joi = require('joi');
const customJoi = Joi.extend(require('joi-phone-number'));

const register = customJoi.object({
  email: customJoi.string().required().email(),
  password: customJoi.string().min(6).required(),
  name: customJoi.string().min(3).max(30).required(),
  contactPhone: customJoi.string().phoneNumber().required(),
});

module.exports = {
  register,
};
