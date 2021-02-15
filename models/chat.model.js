const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    messages: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Message',
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Chat', chatSchema);
