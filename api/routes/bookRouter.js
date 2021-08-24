const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const {
  accessTokenMiddleware,
} = require('../middlewares/accessTokenMiddleware');
const bodyValidatorMiddleware = require('../middlewares/bodyValidatorMiddleware');

/**
 *@doc api/v1/books/ endpoints
 *@controller bookController
 */

router.post(
  '/',
  accessTokenMiddleware,
  bodyValidatorMiddleware('createBook'),
  bookController.createBook
);
router.post('/add-author', bookController.addBookToPublisher);
router.get('/', bookController.fetchAllBooks);
router.get('/:id', bookController.fetchBookById);
router.get('/:id/publishers', bookController.fetchAllPublishersByBookId);
router.put(
  '/:id',
  accessTokenMiddleware,
  bodyValidatorMiddleware('updateBookById'),
  bookController.updateBookById
);
router.delete('/:id', accessTokenMiddleware, bookController.deleteBookById);

module.exports = router;
