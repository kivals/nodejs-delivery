const Joi = require('joi');

const saveAdvertisement = Joi.object({
  shortTitle: Joi.string().min(5).required(),
  description: Joi.string().min(5).required(),
  images: Joi.array().length(1).items(Joi.string()).required(),
});

module.exports = {
  saveAdvertisement,
};
