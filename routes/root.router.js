const router = require(`express`).router();

router.get(`/`, (req, res) => {
  res.json({message: `Welcome to my humble API!`});
});

module.exports = router;