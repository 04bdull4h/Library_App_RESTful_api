const express = require('express');
const router = express.Router();
const borrowerController = require('../controllers/borrowerController');
const {
  accessTokenMiddleware,
} = require('../middlewares/accessTokenMiddleware');
const bodyValidatorMiddleware = require('../middlewares/bodyValidatorMiddleware');

/**
 *@doc api/v1/borrowers/ endpoints
 *@controller borrowerController
 */

router.post(
  '/',
  bodyValidatorMiddleware('createBorrower'),
  borrowerController.createBorrower
);

router.get('/', borrowerController.fetchAllBorrowers);
router.get('/:id', borrowerController.fetchBorrowerById);

module.exports = router;
