module.exports = (req, res, next) => {
  const images = req.files;
  if (images && images.length) {
    req.body.images = images.map((i) => i.filename);
  }
  return next();
};
