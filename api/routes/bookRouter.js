const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.post('/', bookController.createBook);
router.get('/', bookController.fetchAllBooks);
router.get('/:id', bookController.fetchedBookById);

module.exports = router;
