const express = require('express');
const router = express.Router();
const publisherController = require('../controllers/publisherController');
const {
  accessTokenMiddleware,
} = require('../middlewares/accessTokenMiddleware');
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
  accessTokenMiddleware,
  bodyValidatorMiddleware('updatePublisherById'),
  publisherController.updatePublisherById
);
router.delete(
  '/:id',
  accessTokenMiddleware,
  publisherController.deletePublisherById
);

module.exports = router;
