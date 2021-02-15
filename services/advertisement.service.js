const { Advertisement } = require('../models');
const ApiError = require('../lib/api-error');

const queryAdvertisement = async () =>
  Advertisement.find({ isDeleted: false }).populate('user');

const createAdvertisement = async (data) => {
  const { shortText, description, images, user, userName } = data;
  const advertisement = await Advertisement.create({
    shortText,
    description,
    images,
    user,
    name: userName,
  });
  return advertisement.populate('user').execPopulate();
};

const getAdvertisementById = async (id) =>
  Advertisement.findOne({ _id: id, isDeleted: false }).populate('user');

const deleteAdvertisement = async (id, userId) => {
  const deletedAdv = await getAdvertisementById(id);
  if (!deletedAdv) {
    throw ApiError.notFound('Advertisement not found');
  }
  if (deletedAdv.user.id.toString() !== userId.toString()) {
    throw ApiError.forbidden('Not access');
  }
  return deletedAdv.updateOne({ isDeleted: true });
};

module.exports = {
  queryAdvertisement,
  getAdvertisementById,
  createAdvertisement,
  deleteAdvertisement,
};
