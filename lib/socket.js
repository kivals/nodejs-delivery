const socketIO = require('socket.io');
const { chatService, sessionService } = require('../services');
const logger = require('./logger');

module.exports = (server) => {
  const io = socketIO(server);

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

    next();
  });

  io.on('connection', (socket) => {
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

    socket.on('sendMessage', async (data) => {
      if (!socket.user) {
        socket.emit('getHistory', 'Not allowed');
      }
      const { receiver, text } = data;
      await chatService.sendMessage({
        authorId: socket.user.id,
        receiver,
        text,
      });
    });
  });

  return io;
};
