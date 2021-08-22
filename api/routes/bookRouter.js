const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { checkAuth } = require('../middlewares/checkAuth');

/**
 *@doc api/v1/books/ endpoints
 *@controller bookController
 */

router.post('/', checkAuth, bookController.createBook);
router.get('/', bookController.fetchAllBooks);
router.get('/:id', bookController.fetchBookById);
router.put('/:id', checkAuth, bookController.updateBookById);
router.delete('/:id', checkAuth, bookController.deleteBookById);

module.exports = router;
