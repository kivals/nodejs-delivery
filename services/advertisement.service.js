const { Advertisement } = require('../models');
const ApiError = require('../lib/api-error');

const queryAdvertisement = async () => Advertisement.find({}).populate('user');

const createAdvertisement = async (data) => {
  const { shortTitle, description, images, user, userName } = data;
  const advertisement = await Advertisement.create({
    shortTitle,
    description,
    images,
    user,
    name: userName,
  });
  return advertisement.populate('user').execPopulate();
};

const getAdvertisementById = async (id) => Advertisement.findById(id);

const deleteAdvertisement = async (id, userId) => {
  const deletedAdv = await getAdvertisementById(id);
  if (!deletedAdv) {
    throw ApiError.notFound('Advertisement not found');
  }
  if (deletedAdv.user.toString() !== userId.toString()) {
    throw ApiError.forbidden('Not access');
  }
  await deletedAdv.remove();
  return deletedAdv;
};

module.exports = {
  queryAdvertisement,
  createAdvertisement,
  deleteAdvertisement,
};
