const { User } = require('../models');

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    // throw Error
  }

  const user = User.create(userBody);
  return user;
};

module.exports = {
  createUser,
};
