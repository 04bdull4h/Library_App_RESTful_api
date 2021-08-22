const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 *@doc api/v1/users/ endpoints
 *@controller userController
 */

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', userController.fetchAllUsers);
router.get('/:id', userController.fetchUserById);

module.exports = router;
