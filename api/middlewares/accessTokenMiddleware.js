const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_KEY || 'JWT_KEY';
const { unauthorizedLogger } = require('../utils/loggerMethods');

const accessTokenMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, secretKey);
    req.userData = decoded;
    next();
  } catch (err) {
    unauthorizedLogger(req);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

module.exports = {
  accessTokenMiddleware,
};
