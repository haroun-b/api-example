const { books } = require(`./books.data`),
  mongoose = require(`mongoose`),
  Book = require(`../models/book.model`);

require('dotenv').config();


(async () => {
  try {
    const connection = await mongoose.connect(`mongodb+srv://haroun:${process.env.DB_PASSWORD}@cluster0.gnv6zgz.mongodb.net/?retryWrites=true&w=majority`);

    console.log(`Connected to ${connection.connections[0].name}...`);

    await Book.deleteMany();

    const insertedBooks = await Book.insertMany(books),
      insertedTitles = insertedBooks.map(book => book.title);

    console.log(`Inserted: `, insertedTitles);

    return mongoose.disconnect();
  } catch (error) {
    console.error(error.message);
  }
})()