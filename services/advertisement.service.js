const { Advertisement } = require('../models');

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

module.exports = {
  queryAdvertisement,
  createAdvertisement,
};
