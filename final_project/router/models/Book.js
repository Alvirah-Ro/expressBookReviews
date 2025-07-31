const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  id: String,
  title: String,
  author: String,
  reviews: [{
    username: String,
    text: String,
    rating: Number,
    date: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Book', bookSchema);