const { Chat } = require('../models');
const messageService = require('./message.service');

// TODO ошибки
// вынести поиск чата из функции
const sendMessage = async (chat, data) => {
  const { authorId, text } = data;
  // создаем новое сообщение
  const message = await messageService.createMessage(authorId, text);

  await chat.updateOne({ $push: { messages: message } });
  return message;
};

const createChat = async (users) => {
  const newChat = new Chat({
    users,
  });
  return newChat.save();
};

const find = async (users) =>
  Chat.findOne({ users: { $all: users } }).populate('messages');

module.exports = {
  find,
  sendMessage,
  createChat,
};
