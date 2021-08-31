const express = require('express');
const router = express.Router();
const borrowerController = require('../controllers/borrowerController');
const {
  accessTokenMiddleware,
} = require('../middlewares/accessTokenMiddleware');
const bodyValidatorMiddleware = require('../middlewares/bodyValidatorMiddleware');
