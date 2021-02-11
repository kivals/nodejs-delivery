const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    // createAt: {
    //   type: Date,
    //   required: true,
    // },
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
