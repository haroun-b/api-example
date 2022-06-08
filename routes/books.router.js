const router = require(`express`).Router(),
  mongoose = require(`mongoose`),
  Book = require(`../models/book.model`);

require('dotenv').config();

(async () => {
  try {
    const connection = await mongoose.connect(`mongodb+srv://haroun:${process.env.DB_PASSWORD}@cluster0.gnv6zgz.mongodb.net/?retryWrites=true&w=majority`);

    console.log(`Connected to ${connection.connections[0].name}...`);
  } catch (error) {
    console.error(error);
  }
})()

router.route(`/`)
  .get(async (req, res) => {
    const books = await Book.find({}, { _id: 0, __v: 0 });
    return res.json({ books });
  })
  .post(async (req, res) => {
    try {
      const book = req.body;

      await Book.create(book);

      return res.status(201).json(book);
    } catch ({ message }) {
      return res.status(400).json({ message });
    }
  });

router.get(`/find`, async (req, res) => {
  try {
    const searchQuery = req.query;

    for (const param in searchQuery) {
      searchQuery[param] = new RegExp(searchQuery[param], `i`);
    }

    const result = await Book.find(searchQuery, { _id: 0, __v: 0 });
    return res.status(200).json({ result });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
});

module.exports = router;