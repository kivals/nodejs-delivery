const { User } = require('../models');
const ApiError = require('../lib/api-error');

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw ApiError.badRequest('Email already taken');
  }
  const user = new User({
    email: userBody.email,
    displayName: userBody.displayName,
    name: userBody.name,
    contactPhone: userBody.contactPhone,
  });
  await user.setPassword(userBody.password);
  return user.save();
};

const findByEmail = async (email) => await User.findOne({ email });

module.exports = {
  createUser,
  findByEmail,
};
