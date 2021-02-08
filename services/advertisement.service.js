const { Advertisement } = require('../models');

const queryAdvertisement = async () => Advertisement.find({});
const createAdvertisement = async (data) => {
  console.log('SERVICE');
  console.log(data);
  const { shortTitle, description, images, user, userName } = data;
  const advertisement = await Advertisement.create({
    shortTitle,
    description,
    images,
    user,
    name: userName,
  });
  return advertisement;
};

module.exports = {
  queryAdvertisement,
  createAdvertisement,
};
