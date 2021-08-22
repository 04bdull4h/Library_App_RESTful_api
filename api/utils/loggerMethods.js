const logger = require('../utils/logger');
const ip = require('ip');

const okLogger = (req) => {
  logger.info(
    `200, OK, ${req.originalUrl}, ${req.method}, ${req.ip}, ${ip.address()}`
  );
};

const createdLogger = (req) => {
  logger.info(
    `201, Created, ${req.originalUrl}, ${req.method}, ${
      req.ip
    }, ${ip.address()}`
  );
};

const conflictLogger = (req) => {
  logger.info(
    `409, Conflict, ${req.originalUrl}, ${req.method}, ${
      req.ip
    }, ${ip.address()}`
  );
};

const badRequestLogger = (req) => {
  logger.info(
    `400, Bad Request, ${req.originalUrl}, ${req.method}, ${
      req.ip
    }, ${ip.address()}`
  );
};

const internalServerErrorLogger = (req) => {
  logger.info(
    `500, Internal Server Error, ${req.originalUrl}, ${req.method}, ${
      req.ip
    }, ${ip.address()}`
  );
};

const forbiddenLogger = (req) => {
  logger.info(
    `403, Forbidden, ${req.originalUrl}, ${req.method}, ${
      req.ip
    }, ${ip.address()}`
  );
};
const notFoundLogger = (req) => {
  logger.info(
    `404, Not Found, ${req.originalUrl}, ${req.method}, ${
      req.ip
    }, ${ip.address()}`
  );
};
const unauthorizedLogger = (req) => {
  logger.info(
    `401, Unauthorized, ${req.originalUrl}, ${req.method}, ${
      req.ip
    }, ${ip.address()}`
  );
};

module.exports = {
  okLogger,
  createdLogger,
  conflictLogger,
  badRequestLogger,
  internalServerErrorLogger,
  forbiddenLogger,
  notFoundLogger,
  unauthorizedLogger,
};
