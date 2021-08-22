const { User } = require('../models');
const { genSaltSync, hashSync } = require('bcrypt');

const register = async (req, res) => {
  try {
    const reqBody = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    const salt = genSaltSync(12);
    reqBody.password = hashSync(reqBody.password, salt);
    const createdUser = await User.create(reqBody);
    res.status(201).json({
      success: true,
      message: 'user created successfully',
      result: createdUser,
    });
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: err.errors.map((e) => e.message),
      });
    }
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        success: false,
        message: err.errors.map((e) => e.message),
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'server issue',
        error: err.errors.map((e) => e.message),
      });
    }
  }
};

const login = (req, res) => {};

const fetchAllUsers = async (req, res) => {};
const fetchUserById = async (req, res) => {};
const updateUserById = async (req, res) => {};
const deleteUserById = async (req, res) => {};

module.exports = {
  register,
  login,
};
