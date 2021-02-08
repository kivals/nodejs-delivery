const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required: true,
  },
  lastVisit: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

sessionSchema.path('lastVisit').index({ expires: '7d' });

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
