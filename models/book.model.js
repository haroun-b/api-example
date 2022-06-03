const mongoose = require(`mongoose`),
  { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  publisher: {
    type: String,
    required: true
  }
});

// mongoose figures out the collection's name on its own by lowerCasing and pluralizing the model's name passed as the first argument to mongoose.model()
const Book = mongoose.model(`Book`, bookSchema);

module.exports = Book;