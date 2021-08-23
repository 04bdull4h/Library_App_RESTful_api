const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {
  accessTokenMiddleware,
} = require('../middlewares/accessTokenMiddleware');
const bodyValidatorMiddleware = require('../middlewares/bodyValidatorMiddleware');

/**
 *@doc api/v1/users/ endpoints
 *@controller userController
 */

router.post(
  '/register',
  bodyValidatorMiddleware('register'),
  userController.register
);
router.post('/login', userController.login);
router.get('/', userController.fetchAllUsers);
router.get('/:id', userController.fetchUserById);
router.delete('/:id', accessTokenMiddleware, userController.deleteUserById);
router.put('/:id', accessTokenMiddleware, userController.updateUserById);

module.exports = router;
