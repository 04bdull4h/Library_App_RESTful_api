const { Department } = require('../models');
const { validationResult } = require('express-validator');
const {
  okLogger,
  createdLogger,
  badRequestLogger,
  notFoundLogger,
} = require('../utils/loggerMethods');

const fetchAllDepartments = async (req, res, next) => {
  try {
    const departments = await Department.findAll();
    if (!departments) {
      return res.status(404).json({
        success: false,
        message: `There is no departments in the database right now not`,
        data: {},
      });
    }
    okLogger(req);
    res.status(200).json({
      success: true,
      message: 'Departments fetched successfully',
      data: departments,
    });
  } catch (err) {}
};

const fetchAllEmployeesByDepartmentId = async (req, res, next) => {
  try {
  } catch (err) {}
};
const fetchDepartmentById = async (req, res, next) => {
  try {
  } catch (err) {}
};
const createDepartment = async (req, res, next) => {
  try {
  } catch (err) {}
};
const updateDepartmentById = async (req, res, next) => {
  try {
  } catch (err) {}
};
const deleteDepartmentById = async (req, res, next) => {
  try {
  } catch (err) {}
};

module.exports = {
  fetchAllDepartments,
  fetchDepartmentById,
  fetchAllEmployeesByDepartmentId,
  createDepartment,
  updateDepartmentById,
  deleteDepartmentById,
};
