
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  size: {
    type: String,
    enum: ['small', 'medium', 'large'],
  },
});

module.exports = mongoose.model('Item', itemSchema);
