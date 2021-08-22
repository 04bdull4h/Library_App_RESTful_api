const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const { checkTokenAuth } = require('../middlewares/checkTokenAuth');

/**
 *@doc api/v1/authors/ endpoints
 *@controller authorController
 */

router.post('/', checkTokenAuth, authorController.createAuthor);
router.get('/:id/books', authorController.fetchAllBooksByAuthorId);
router.get('/', authorController.fetchAllAuthors);
router.get('/:id', authorController.fetchAuthorById);
router.put('/:id', checkTokenAuth, authorController.updateAuthorById);
router.delete('/:id', checkTokenAuth, authorController.deleteAuthorById);

module.exports = router;
