function addErrorHandler(app) {
  app.use((req, res, next) => {
    res.status(404).json({
      message: `Route not found: ${req.originalUrl}`,
    });
  });

  app.use((error, req, res, next) => {
    console.error('ERROR', error.message);

    res.status(500).json({
      message: `Internal server error`,
    });
  });
}

module.exports = addErrorHandler;