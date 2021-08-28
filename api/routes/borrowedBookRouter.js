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
  bodyValidatorMiddleware('createBorrowedBook'),
  borrowedBookController.createBorrowedBook
);
router.get('/', borrowedBookController.getAllBorrowedBooks);
router.get('/', borrowedBookController.getAllBorrowedBookById);
router.get('/', borrowedBookController.getAllBorrowedBooksByBorrowerId);
router.update('/', borrowedBookController.updateBorrowedBook);
router.delete('/', borrowedBookController.deleteBorrowedBook);

module.exports = router;
