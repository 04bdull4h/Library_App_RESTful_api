const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const {
  accessTokenMiddleware,
} = require('../middlewares/accessTokenMiddleware');
const bodyValidatorMiddleware = require('../middlewares/bodyValidatorMiddleware');

/**
 *@doc api/v1/borrowers/ endpoints
 *@controller borrowerController
 */

module.exports = router;
