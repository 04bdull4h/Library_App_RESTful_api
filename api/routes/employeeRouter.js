const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const {
  accessTokenMiddleware,
} = require('../middlewares/accessTokenMiddleware');
const bodyValidatorMiddleware = require('../middlewares/bodyValidatorMiddleware');
const employeeController = require('../controllers/employeeController');
/**
 *@doc api/v1/borrowers/ endpoints
 *@controller borrowerController
 */

router.get('/', employeeController.fetchAllEmployees);
router.get('/:id', employeeController.fetchEmployeeById);
router.post(
  '/',
  bodyValidatorMiddleware('createEmployee'),
  employeeController.createEmployee
);
router.put(
  '/:id',
  bodyValidatorMiddleware('updateEmployeeById'),
  employeeController.updateEmployeeById
);
router.delete('/:id', employeeController.deleteEmployeeById);

module.exports = router;
