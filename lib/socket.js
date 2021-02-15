const socketIO = require('socket.io');
const { chatService, sessionService } = require('../services');
const logger = require('./logger');

module.exports = (server) => {
  const io = socketIO(server);

  // Массив со всеми подключениями
  const connections = [];
  io.use(async (socket, next) => {
    const { headers } = socket.handshake;
    const { authorization } = headers;
    const err = new Error('not authorized');

    if (!authorization) return next(err);

    const token = authorization.split(' ')[1];

    if (!token) return next(err);

    const session = await sessionService.findByToken(token);
    if (!session) return next(err);

    socket.user = session.user;

    connections.push(socket);
    next();
  });

  io.on('connection', (socket) => {
    logger.info(`WebSocket. Event: connection. ${socket.user.id}`);
    socket.on('getHistory', async (userId) => {
      if (!socket.user) {
        socket.emit('getHistory', 'Not allowed');
      }
      try {
        const chat = await chatService.find([userId, socket.user.id]);
        socket.emit('chatHistory', {
          messages: chat.messages.map((m) => m.text),
        });
      } catch (e) {
        logger.error(e.stack);
        socket.emit('chatHistory', {
          error: e.message,
        });
      }
    });

    socket.on('disconnect', () => {
      logger.info(`WebSocket. Event: disconnect. ${socket.user.id}`);
      connections.splice(connections.indexOf(socket), 1);
    });

    socket.on('sendMessage', async (data) => {
      logger.info('WebSocket. Event: sendMessage. Start');
      try {
        if (!socket.user) {
          logger.warn('WebSocket. Event: sendMessage. Not allowed');
          socket.emit('serverError', 'Not allowed');
          return;
        }

        const { receiver, text } = data;
        let chat = await chatService.find([receiver, socket.user.id]);
        if (!chat) {
          chat = await chatService.createChat([receiver, socket.user.id]);
        }

        const message = await chatService.sendMessage(chat, {
          text,
          authorId: socket.user.id,
        });

        // Список пользователей из чата которые должны получить сообщения
        const receivers = chat.users;
        // Список подключенных пользователей(сокетов), для который надо осуществить отправку
        const activeReceivers = receivers.reduce((acc, current) => {
          const sockets = connections.filter(
            (connection) =>
              connection.user.id.toString() === current.toString(),
          );
          return [...acc, ...sockets];
        }, []);

        // Делаем рассылку
        activeReceivers.forEach((receiver) =>
          receiver.emit('newMessage', message.text),
        );
        logger.info('WebSocket. Event: sendMessage. End');
      } catch (e) {
        logger.error(e.stack);
        socket.emit('serverError', {
          error: e.message,
        });
      }
    });
  });

  return io;
};
