const { Session } = require('../models');

const findByToken = async (token) =>
  Session.findOne({ token }).populate('user');

const createSession = async (token, user) => {
  await Session.create({ token, user, lastVisit: new Date() });
};

module.exports = {
  findByToken,
  createSession,
};
