const { advertisementService } = require('../services');

const getAdvertisements = async (req, res, next) => {
  const result = await advertisementService.queryAdvertisement();
  res.json({
    data: result,
    status: 'ok',
  });
};

const createAdvertisements = async (req, res, next) => {
  const { shortTitle, description, images } = req.body;

  const advertisement = await advertisementService.createAdvertisement({
    shortTitle,
    description,
    images,
    user: req.user.id,
    name: req.user.name,
  });
  res.json(advertisement);
};

module.exports = {
  getAdvertisements,
  createAdvertisements,
};
