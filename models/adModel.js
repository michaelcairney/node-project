const mongoose = require('mongoose');

const adDataSchema = new mongoose.Schema({
  userId: {
    required: true,
    type: String,
  },
  adType: {
    required: true,
    type: String,
  },
  name: {
    required: false,
    type: String,
  },
  instruments: {
    required: false,
    type: Array,
  },
  seeking: {
    required: false,
    type: Array,
  },
  genres: {
    required: false,
    type: Array,
  },
  description: {
    required: false,
    type: String,
  },
});

const adModel = mongoose.model('ads', adDataSchema);

module.exports = adModel;
