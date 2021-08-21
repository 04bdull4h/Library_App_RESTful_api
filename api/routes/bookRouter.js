const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.post('/', bookController.createBook);
router.get('/', bookController.fetchAllBooks);
router.get('/:id', bookController.fetchedBookById);
router.put('/:id', bookController.updateBookById);
router.delete('/:id', bookController.deleteBookById);

module.exports = router;
