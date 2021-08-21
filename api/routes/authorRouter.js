const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

/**
 *@doc api/v1/authors/ endpoints
 *@controller authorController
 */

router.post('/', authorController.createAuthor);
router.get('/:id/books', authorController.fetchAllBooksByAuthorId);
router.get('/', authorController.fetchAllAuthors);

module.exports = router;
