export const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found !`);
  res.status(404);
  next(error);
};

export const errHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
};
