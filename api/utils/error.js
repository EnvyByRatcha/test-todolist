export const apiError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";

  return res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.status,
  });
};

export const mapError = (err, status, msg, next) => {
  let error = new Error();
  error.statusCode = status || 500;
  error.status = msg || "Internal server error";

  next(error);
};
