const { Advertisement } = require('../models');

const queryAdvertisement = async () => Advertisement.find({});
const createAdvertisement = async () => {
  await Advertisement.create({
    shortText: 'mock',
    isDeleted: false,
  });
};

module.exports = {
  queryAdvertisement,
  createAdvertisement,
};
