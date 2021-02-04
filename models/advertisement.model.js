const mongoose = require('mongoose');
// TODO Не забыть про валидацию
const advertisementSchema = mongoose.Schema({
  shortText: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  images: {
    type: Array,
    trim: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    // required: true,
    trim: true,
  },
  tags: {
    type: Array,
  },
  isDeleted: {
    type: Boolean,
    required: true,
  },
});

const Advertisement = mongoose.model('Advertisement', advertisementSchema);

module.exports = Advertisement;
