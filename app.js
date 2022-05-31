const express = require(`express`),
  rootRouter = require(`./routes/root.router.js`),
  booksRouter = require(`./routes/books.router.js`),
  addErrorHandler = require(`./error-handler.js`),
  app = express(),
  port = 3000;

// parses json requests
app.use(express.json());

app.use(`/`, rootRouter);
app.use(`/books`, booksRouter);

addErrorHandler(app);

app.listen(port, () => {
  console.log(`listening on port :${port}`);
});