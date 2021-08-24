const express = require('express');
const router = express.Router();
const publisherController = require('../controllers/publisherController');
const bodyValidatorMiddleware = require('../middlewares/bodyValidatorMiddleware');

/**
 *@doc api/v1/publishers/ endpoints
 *@controller publisherController
 */

router.post(
  '/',
  bodyValidatorMiddleware('createPublisher'),
  publisherController.createPublisher
);

router.get('/', publisherController.fetchAllPublishers);
router.get('/:id', publisherController.fetchPublisherById);
router.get('/:id/books', publisherController.fetchAllBooksByPublisherId);
router.put(
  '/:id',
  bodyValidatorMiddleware('updatePublisherById'),
  publisherController.updatePublisherById
);
router.delete('/:id', publisherController.deletePublisherById);

module.exports = router;
