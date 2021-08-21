const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

/**
 *@doc api/v1/authors/ endpoints
 *@controller authorController
 */

router.post('/', authorController.createAuthor);
router.get('/books/:id', authorController.fetchAllBooksByAuthorId);

module.exports = router;
