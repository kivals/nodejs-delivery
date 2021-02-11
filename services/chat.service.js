const { Chat } = require('../models');
const messageService = require('./message.service');

const sendMessage = async (data) => {
  const { authorId, receiver, text } = data;
  // создаем новое сообщение
  const message = await messageService.createMessage(authorId, text);

  // поиск чата, если найден добавляем сообщение ему
  const chat = await Chat.findOneAndUpdate(
    { users: [authorId, receiver] },
    { $push: { messages: message } },
  );
  if (!chat) {
    const newChat = new Chat({
      users: [authorId, receiver],
      messages: [message],
    });
    await newChat.save();
    return newChat;
  }
};

const find = async (users) =>
  Chat.findOne({ users: { $all: users } }).populate('messages');

module.exports = {
  find,
  sendMessage,
};
