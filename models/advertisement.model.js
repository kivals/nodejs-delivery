const mongoose = require('mongoose');

const advertisementSchema = mongoose.Schema(
  {
    shortText: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: Array,
      required: true,
      max: 10,
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    tags: {
      type: Array,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Advertisement = mongoose.model('Advertisement', advertisementSchema);

module.exports = Advertisement;
