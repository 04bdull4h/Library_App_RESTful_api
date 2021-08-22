const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const {
  accessTokenMiddleware,
} = require('../middlewares/accessTokenMiddleware');

/**
 *@doc api/v1/authors/ endpoints
 *@controller authorController
 */

router.post('/', accessTokenMiddleware, authorController.createAuthor);
router.get('/:id/books', authorController.fetchAllBooksByAuthorId);
router.get('/', authorController.fetchAllAuthors);
router.get('/:id', authorController.fetchAuthorById);
router.put('/:id', accessTokenMiddleware, authorController.updateAuthorById);
router.delete('/:id', accessTokenMiddleware, authorController.deleteAuthorById);

module.exports = router;
