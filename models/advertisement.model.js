const mongoose = require('mongoose');
// TODO Не забыть про валидацию
const advertisementSchema = mongoose.Schema({
  shortTitle: {
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
  },
});

const Advertisement = mongoose.model('Advertisement', advertisementSchema);

module.exports = Advertisement;
