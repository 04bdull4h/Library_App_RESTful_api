const express = require('express');
const router = express.Router();
const publisherController = require('../controllers/publisherController');
const bodyValidatorMiddleware = require('../middlewares/bodyValidatorMiddleware');

/**
 *@doc api/v1/publishers/ endpoints
 *@controller publisherController
 */

router.post(
  '/',
  bodyValidatorMiddleware('createPublisher'),
  publisherController.createPublisher
);

module.exports = router;
