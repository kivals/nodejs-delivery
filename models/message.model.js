const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // sentAt: {
    //   type: Date,
    //   required: true,
    // },
    text: {
      type: String,
      required: true,
    },
    readAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
