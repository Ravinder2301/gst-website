const errorHandler = (err, req, res, next) => {
  console.error(err.stack || err.message || err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message:
      process.env.NODE_ENV === 'production' && statusCode === 500
        ? 'Something went wrong'
        : err.message || 'Something went wrong'
  });
};

module.exports = errorHandler;
