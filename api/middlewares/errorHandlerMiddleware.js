const ErrorResponse = require('../utils/errorResponse');
const {
  conflictLogger,
  badRequestLogger,
  internalServerErrorLogger,
} = require('../utils/loggerMethods');

const errorHandlerMiddleware = (err, req, res, next) => {
  let error = { ...err };
  console.log(err);
  error.message = err.message;
  if (err.name === 'SequelizeValidationError') {
    badRequestLogger(req);
    const message = err.errors.map((e) => e.message);
    error = new ErrorResponse(message, 400);
    console.log(error);
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    conflictLogger(req);
    const message = err.message;
    error = new ErrorResponse(message, 409);
  }
  internalServerErrorLogger(req);
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'server issue',
  });
};

module.exports = errorHandlerMiddleware;
