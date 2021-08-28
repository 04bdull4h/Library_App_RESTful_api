const express = require('express');
const router = express.Router();
const borrowedBookController = require('../controllers/borrowedBookController');
const {
  accessTokenMiddleware,
} = require('../middlewares/accessTokenMiddleware');
const bodyValidatorMiddleware = require('../middlewares/bodyValidatorMiddleware');

/**
 *@doc api/v1/borrowed-books/ endpoints
 *@controller borrowedBookController
 */

router.post(
  '/',
  accessTokenMiddleware,
  bodyValidatorMiddleware('createBorrowedBook'),
  borrowedBookController.createBorrowedBook
);
router.get('/', borrowedBookController.fetchAllBorrowedBooks);
router.get('/:id', borrowedBookController.fetchAllBorrowedBookById);
router.put(
  '/:id',
  accessTokenMiddleware,
  bodyValidatorMiddleware('updateBorrowedBook'),
  borrowedBookController.updateBorrowedBook
);
router.delete(
  '/:id',
  accessTokenMiddleware,
  borrowedBookController.deleteBorrowedBook
);

module.exports = router;
