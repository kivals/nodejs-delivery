const { userService } = require('../services');

const register = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.json({
      data: {
        id: user._id,
        email: user.email,
        name: user.name,
        contactPhone: user.contactPhone,
      },
      status: 'ok',
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  register,
};
