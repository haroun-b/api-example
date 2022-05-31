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

router.get(`/find`, (req, res) => {
  const validRequestKeys = Object.entries(req.query).filter(([key, value]) => validKeys.includes(key));

  const result = books.filter(book => {
    return validRequestKeys.every(([key, value]) => book[key].localeCompare(value, `en`, { sensitivity: 'base' }) === 0);
  });

  return res.status(200).json({ result });
});

module.exports = router;