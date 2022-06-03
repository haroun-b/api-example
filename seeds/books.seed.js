const { books } = require(`./books.data`),
  mongoose = require(`mongoose`),
  Book = require(`../models/book.model`);

(async () => {
  try {
    const connection = await mongoose.connect(`mongodb://127.0.0.1:27017/bibliotheca`);

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