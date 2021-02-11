const { Message } = require('../models');

const createMessage = async (author, text) => {
  const message = new Message({
    author,
    text,
  });
  await message.save();
  return message;
};

module.exports = {
  createMessage,
};
