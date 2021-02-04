const { advertisementService } = require('../services');

const getAdvertisements = async (req, res, next) => {
  const result = await advertisementService.queryAdvertisement();
  res.send(result);
};

const createAdvertisements = async (req, res, next) => {
  await advertisementService.createAdvertisement();
  res.send('ok');
};

module.exports = {
  getAdvertisements,
  createAdvertisements,
};
