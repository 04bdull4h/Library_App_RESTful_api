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
    return res.status(400).json({
      success: false,
      msg: 'Invalid inputs',
      errors: err.errors.map((e) => e.message),
    });
  }
  if (err.name === 'SequelizeUniqueConstraintError') {
    conflictLogger(req);
    return res.status(409).json({
      success: false,
      msg: 'Duplicated value',
      errors: err.message,
    });
  }
  internalServerErrorLogger(req);
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'server issue',
  });
};

module.exports = errorHandlerMiddleware;
