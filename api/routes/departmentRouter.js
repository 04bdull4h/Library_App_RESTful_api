const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const {
  accessTokenMiddleware,
} = require('../middlewares/accessTokenMiddleware');
const bodyValidatorMiddleware = require('../middlewares/bodyValidatorMiddleware');

module.exports = router;
