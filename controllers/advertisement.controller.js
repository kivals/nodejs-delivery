const ApiError = require('../lib/api-error');
const { advertisementService } = require('../services');

const getAdvertisements = async (req, res, next) => {
  try {
    const advertisements = await advertisementService.queryAdvertisement();
    res.json({
      data: advertisements.map((adv) => ({
        id: adv.id,
        shortText: adv.shortText,
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

const getAdvertisementById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const advertisement = await advertisementService.getAdvertisementById(id);
    if (!advertisement) {
      return next(ApiError.notFound('Advertisement not found'));
    }
    res.json({
      data: {
        id: advertisement.id,
        shortText: advertisement.shortText,
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
    next(e);
  }
};

const createAdvertisements = async (req, res, next) => {
  const { shortText, description, images } = req.body;
  try {
    const advertisement = await advertisementService.createAdvertisement({
      shortText,
      description,
      images,
      user: req.user.id,
      name: req.user.name,
    });

    res.json({
      data: {
        id: advertisement.id,
        shortText: advertisement.shortText,
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
  getAdvertisementById,
  createAdvertisements,
  deleteAdvertisement,
};
