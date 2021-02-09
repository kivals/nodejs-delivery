const { advertisementService } = require('../services');

const getAdvertisements = async (req, res, next) => {
  try {
    const advertisement = await advertisementService.queryAdvertisement();
    res.json({
      data: advertisement.map((adv) => ({
        id: adv.id,
        shortTitle: adv.shortTitle,
        description: adv.description,
        images: adv.images,
        user: {
          id: adv.user.id,
          name: adv.user.name,
        },
        createdAt: adv.createdAt,
      })),
      status: 'ok',
    });
  } catch (e) {
    return next(e);
  }
};

const createAdvertisements = async (req, res, next) => {
  const { shortTitle, description, images } = req.body;
  try {
    const advertisement = await advertisementService.createAdvertisement({
      shortTitle,
      description,
      images,
      user: req.user.id,
      name: req.user.name,
    });

    res.json({
      data: {
        id: advertisement.id,
        shortTitle: advertisement.shortTitle,
        description: advertisement.description,
        images: advertisement.images,
        user: {
          id: advertisement.user.id,
          name: advertisement.user.name,
        },
        createdAt: advertisement.createdAt,
      },
      status: 'ok',
    });
  } catch (e) {
    return next(e);
  }
};

const deleteAdvertisement = async (req, res, next) => {
  try {
    const { id } = req.params;
    await advertisementService.deleteAdvertisement(id, req.user.id);
    res.json({
      status: 'ok',
    });
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  getAdvertisements,
  createAdvertisements,
  deleteAdvertisement,
};
