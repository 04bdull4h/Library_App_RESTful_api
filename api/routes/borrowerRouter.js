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

router.get('/', borrowerController.fetchAllBorrowers);
router.get('/:id', borrowerController.fetchBorrowerById);
router.get(
  '/:id/borrowed-books',
  borrowerController.fetchAllBorrowedBooksByBorrowerId
);
router.post(
  '/',
  accessTokenMiddleware,
  bodyValidatorMiddleware('createBorrower'),
  borrowerController.createBorrower
);
router.put(
  '/:id',
  accessTokenMiddleware,
  borrowerController.updateBorrowerById
);
router.delete(
  '/:id',
  accessTokenMiddleware,
  bodyValidatorMiddleware('updateBorrower'),
  borrowerController.deleteBorrowerById
);

module.exports = router;
