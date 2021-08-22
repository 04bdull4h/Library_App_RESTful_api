const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { checkTokenAuth } = require('../middlewares/checkTokenAuth');

/**
 *@doc api/v1/books/ endpoints
 *@controller bookController
 */

router.post('/', checkTokenAuth, bookController.createBook);
router.get('/', bookController.fetchAllBooks);
router.get('/:id', bookController.fetchBookById);
router.put('/:id', checkTokenAuth, bookController.updateBookById);
router.delete('/:id', checkTokenAuth, bookController.deleteBookById);

module.exports = router;
