const { Department } = require('../models');
const { validationResult } = require('express-validator');
const {
  okLogger,
  createdLogger,
  badRequestLogger,
  notFoundLogger,
} = require('../utils/loggerMethods');

const fetchAllDepartments = async (req, res, next) => {};
const fetchDepartmentById = async (req, res, next) => {};
const createDepartment = async (req, res, next) => {};
const updateDepartmentById = async (req, res, next) => {};
const deleteDepartmentById = async (req, res, next) => {};

module.exports = {
  fetchAllDepartments,
  fetchDepartmentById,
  createDepartment,
  updateDepartmentById,
  deleteDepartmentById,
};
