require('dotenv').config();
// TODO Сделать валидацию параметров через JOI
module.exports = {
  port: process.env.APP_PORT || 3000,
  host: process.env.HOST || '127.0.0.1',
  logger: {
    level: process.env.NODE_ENV !== 'production' ? 'verbose' : 'info',
  },
  mongoose: {
    url: process.env.MONGODB_URL,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
