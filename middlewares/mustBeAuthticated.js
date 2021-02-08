module.exports = (req, res, next) => {
  if (!req.user) {
    res.redirect('/api/auth/signin');
  } else {
    next();
  }
};
