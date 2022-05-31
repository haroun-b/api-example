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

    let errorMsg = ``;

    if (invalidKeys.length) {
      errorMsg += `Invalid keys: ${invalidKeys.join(`; `)}.`
    }
    if (missingKeys.length) {
      errorMsg += `Missing keys: ${missingKeys.join(`; `)}.`
    }

    if (errorMsg) {
      return res.status(400).json({ message: errorMsg });
    }
  });

module.exports = router;