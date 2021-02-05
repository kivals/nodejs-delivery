const { userService } = require('../services');

// TODO
const createUser = async (req, res) => {
  const user = userService.createUser(req.body);
  res.status(200).send('create user');
};

module.exports = {
  createUser,
};
