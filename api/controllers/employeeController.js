const {} = require('../models');
const { validationResult } = require('express-validator');
const {
  okLogger,
  createdLogger,
  badRequestLogger,
  notFoundLogger,
} = require('../utils/loggerMethods');

const fetchAllEmployees = async (req, res, next) => {};
const fetchEmployeeById = async (req, res, next) => {};
const createEmployee = async (req, res, next) => {
  try {
  } catch (err) {}
};
const updateEmployeeById = async (req, res, next) => {};
const deleteEmployeeById = async (req, res, next) => {};

module.exports = {
  fetchAllEmployees,
  fetchEmployeeById,
  createEmployee,
  updateEmployeeById,
  deleteEmployeeById,
};
