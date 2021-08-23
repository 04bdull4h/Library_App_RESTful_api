const {
  conflictLogger,
  internalServerErrorLogger,
} = require('../utils/loggerMethods');

const errorHandlerMiddleware = (err, req, res, next) => {
  let error = { ...err };
  // for developer
  console.log(err);
  error.message = err.message;
  if (err.name === 'SequelizeUniqueConstraintError') {
    conflictLogger(req);
    return res.status(409).json({
      success: false,
      msg: 'Conflict error',
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
