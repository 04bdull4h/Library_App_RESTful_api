const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

/**
 *@doc api/v1/books/ endpoints
 *@controller bookController
 */

router.post('/', authorController.createAuthor);

module.exports = router;
