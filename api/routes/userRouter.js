const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkTokenAuth } = require('../middlewares/checkTokenAuth');

/**
 *@doc api/v1/users/ endpoints
 *@controller userController
 */

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', userController.fetchAllUsers);
router.get('/:id', userController.fetchUserById);
router.delete('/:id', checkTokenAuth, userController.deleteUserById);
router.put('/:id', checkTokenAuth, userController.updateUserById);

module.exports = router;
