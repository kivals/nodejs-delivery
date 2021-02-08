const uuid = require('uuid-v4');
const { userService } = require('../services');
const { sessionService } = require('../services');
const ApiError = require('../lib/api-error');
const passport = require('../lib/passport');

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

const login = async (req, res, next) => {
  await passport.authenticate('local', async (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return next(ApiError.badRequest(info));
    }

    const token = uuid();
    try {
      await sessionService.createSession(token, user);
    } catch (e) {
      return next(e);
    }

    res.json({
      data: {
        id: user._id,
        email: user.email,
      },
      token,
      status: 'ok',
    });
  })(req, res, next);
};

module.exports = {
  register,
  login,
};
