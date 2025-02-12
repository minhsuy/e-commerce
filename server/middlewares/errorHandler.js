export const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found !`);
  res.status(404), next(error);
};
export const errHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  return res.status(statusCode).json({
    success: false,
    message: err?.message,
  });
};
