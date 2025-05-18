const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  id: String,
  title: String,
  author: String,
  reviews: Object
});

module.exports = mongoose.model('Book', bookSchema);