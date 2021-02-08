const uploader = require('multer');

const storage = uploader.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`,
    );
  },
});

const allowedTypes = [
  'image/pjpeg',
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/x-png',
  'image/x-png',
];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = uploader({
  storage,
  fileFilter,
});
