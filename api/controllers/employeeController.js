const { Employee } = require('../models');
const { validationResult } = require('express-validator');
const {
  okLogger,
  createdLogger,
  badRequestLogger,
  notFoundLogger,
} = require('../utils/loggerMethods');

const fetchAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.findAll();
    if (!employees) {
      return res.status(404).json({
        success: false,
        message: `There is no employees in the database right now not`,
        data: {},
      });
    }
    okLogger(req);
    res.status(200).json({
      success: true,
      message: 'Employees fetched successfully',
      data: employees,
    });
  } catch (err) {
    next(err);
  }
};

const fetchEmployeeById = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      notFoundLogger(req);
      return res.status(404).json({
        success: false,
        message: `Employee with id ${employeeId} not found in the database`,
        data: {},
      });
    }
    okLogger(req);
    res.status(200).json({
      success: true,
      message: `Employee with id ${employeeId} fetched successfully`,
      result: employee,
    });
  } catch (err) {
    next(err);
  }
};

const createEmployee = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      badRequestLogger(req);
      return res.status(400).json({
        success: false,
        msg: 'Validation errors',
        errors: errors.array(),
      });
    }
    const body = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      jobTitle: req.body.jobTitle,
      department: req.body.department,
      salary: req.body.salary,
      hireDate: req.body.hireDate,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    };
    const createdEmployee = await Employee.create(body);
    createdLogger(req);
    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: createdEmployee,
    });
  } catch (err) {
    next(err);
  }
};
const updateEmployeeById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    badRequestLogger(req);
    return res.status(400).json({
      success: false,
      msg: 'Validation errors',
      errors: errors.array(),
    });
  }
  const employeeId = req.params.id;
  const body = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    jobTitle: req.body.jobTitle,
    department: req.body.department,
    salary: req.body.salary,
    hireDate: req.body.hireDate,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  };
  const employee = await Employee.findByPk(employeeId);
  if (!employee) {
    notFoundLogger(req);
    return res.status(404).json({
      success: false,
      message: `Book with id ${employeeId} not found in the database`,
      data: {},
    });
  }
  await Employee.update(body);
  okLogger(req);
  res.status(200).json({
    success: true,
    message: `Book with id ${bookId} updated successfully`,
    data: body,
  });
};

const deleteEmployeeById = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const deletedEmployee = await Borrower.destroy({
      where: { id: employeeId },
    });
    if (!deletedEmployee) {
      notFoundLogger(req);
      return res.status(404).json({
        success: false,
        message: `Employee with id ${employeeId} not found in the database`,
        data: {},
      });
    }
    okLogger(req);
    res.status(200).json({
      success: true,
      message: `Employee with id ${employeeId} deleted successfully`,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  fetchAllEmployees,
  fetchEmployeeById,
  createEmployee,
  updateEmployeeById,
  deleteEmployeeById,
};
