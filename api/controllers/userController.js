const { User } = require('../models');
const { genSalt, hash, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @description   To create a new user
 * @route         POST => api/v1/users/register
 * @access        Public
 */

const register = async (req, res) => {
  try {
    const body = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    body.password = await hash(body.password, salt);
    const createdUser = await User.create(body);
    res.status(201).json({
      success: true,
      message: 'user created successfully',
      data: createdUser,
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
      console.log(err);
      return res.status(500).json({
        success: false,
        message: 'server issue',
        error: err,
      });
    }
  }
};

/**
 * @description   To authorize a user to login
 * @route         POST => api/v1/users/login
 * @access        Public
 */

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'The email is required',
      });
    }
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `The email: ${email} not found in the database`,
      });
    }
    const result = compare(password, user.password);
    if (result) {
      const token = jwt.sign(
        {
          email: user.email,
          userId: user.id,
        },
        process.env.JWT_KEY
      );
      res.status(200).json({
        success: true,
        message: 'user logged in successfully',
        token: token,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'server issue',
      error: err,
    });
  }
};

/**
 * @description   fetch all users
 * @route         GET => api/v1/users/
 * @access        Public
 */

const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users) {
      return res.status(404).json({
        success: false,
        message: 'there is no users found in the database',
        result: {},
      });
    }
    res.status(200).json({
      success: true,
      message: 'users fetched successfully',
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'server issue',
      error: err.errors.map((e) => e.message),
    });
  }
};

/**
 * @description   To fetch a user by id
 * @route         GET => api/v1/user/
 * @access        Public
 */

const fetchUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const fetchedUser = await User.findByPk(userId);
    if (!fetchedUser) {
      return res.status(404).json({
        success: false,
        message: `user with id ${userId} not found in the database`,
      });
    }
    res.status(200).json({
      success: true,
      message: `user with id ${userId} fetched successfully`,
      data: fetchedUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'server issue',
      error: err,
    });
  }
};

/**
 * @description   To delete a user by id
 * @route         POST => api/v1/users/
 * @access        Private
 */

const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.destroy({ where: { id: userId } });
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: `user with id ${userId} not found`,
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: `user with id ${userId} deleted successfully`,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'server issue',
      error: err,
    });
  }
};

/**
 * @description   To delete a update by id
 * @route         POST => api/v1/users/
 * @access        Private
 */

const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const body = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    const updatedUser = await User.update(body, { where: { id: userId } });
    if (!updatedUser[0]) {
      return res.status(404).json({
        success: true,
        message: `user with id ${userId} not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: 'user updated successfully',
      data: body,
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
      console.log(err);
      return res.status(500).json({
        success: false,
        message: 'server issue',
        error: err,
      });
    }
  }
};

module.exports = {
  register,
  login,
  fetchAllUsers,
  fetchUserById,
  deleteUserById,
  updateUserById,
};
