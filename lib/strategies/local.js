const LocalStrategy = require('passport-local').Strategy;
const { userService } = require('../../services');

module.exports = new LocalStrategy(
  { usernameField: 'email', session: false },
  async (email, password, done) => {
    try {
      const user = await userService.findByEmail(email);
      if (!user) {
        return done(null, false, 'There is no such user');
      }
      const isValidPassword = await user.checkPassword(password);
      if (!isValidPassword) {
        return done(null, false, 'Incorrect password');
      }
      return done(null, user);
    } catch (e) {
      done(e);
    }
  },
);
