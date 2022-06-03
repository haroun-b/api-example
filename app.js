const express = require(`express`),
  rootRouter = require(`./routes/root.router`),
  booksRouter = require(`./routes/books.router`),
  addErrorHandler = require(`./error-handler`),
  app = express(),
  port = 8080;

// parses json requests
app.use(express.json());

app.use(`/`, rootRouter);
app.use(`/books`, booksRouter);

addErrorHandler(app);

app.listen(port, () => {
  console.log(`listening on port :${port}`);
});