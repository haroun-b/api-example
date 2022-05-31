const router = require(`express`).Router(),
  { validKeys, books } = require(`../books.data.js`);

router.route(`/`)
  .get((req, res) => {
    return res.json({ books });
  })
  .post((req, res) => {
    const book = req.body,
      bookKeys = Object.keys(book),
      invalidKeys = bookKeys.filter(key => !validKeys.includes(key)),
      missingKeys = validKeys.filter(key => !bookKeys.includes(key));

    let badRequest = {};

    if (invalidKeys.length) {
      badRequest.invalidKeys = invalidKeys;
    }
    if (missingKeys.length) {
      badRequest.missingKeys = missingKeys;
    }
    if (Object.keys(badRequest).length) {
      badRequest.message = `Bad Request!`;
      return res.status(400).json(badRequest);
    }

    books.push(book);
    return res.status(201).json(book);
  });

module.exports = router;