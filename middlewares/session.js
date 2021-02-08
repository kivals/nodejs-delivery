const { sessionService } = require('../services');

module.exports = async (req, res, next) => {
  const header = req.get('Authorization');
  if (!header) return next();

  const token = header.split(' ')[1];
  if (!token) return next();

  try {
    const session = await sessionService.findByToken(token);
    if (session) {
      session.lastVisit = new Date();
      await session.save();
      req.user = session.user;
    }
  } catch (e) {
    return next(e);
  }

  return next();
};
