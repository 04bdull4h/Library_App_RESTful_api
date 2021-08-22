const { User } = require('../models');
const { genSalt, hash, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  okLogger,
  createdLogger,
  badRequestLogger,
  forbiddenLogger,
  notFoundLogger,
} = require('../utils/loggerMethods');

/**
 * @description   To create a new user
 * @route         POST => api/v1/users/register
 * @access        Public
 */

const register = async (req, res, next) => {
  try {
    const body = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    if (!body.password) {
      return res.status(400).json({
        success: false,
        message: 'password is required',
        data: {},
      });
    }
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    body.password = await hash(body.password, salt);
    const createdUser = await User.create(body);
    createdLogger(req);
    res.status(201).json({
      success: true,
      message: 'user created successfully',
      data: createdUser,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description   To authorize a user to login
 * @route         POST => api/v1/users/login
 * @access        Public
 */

const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email) {
      badRequestLogger(req);
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
        data: {},
      });
    }
    const result = await compare(password, user.password);
    if (result) {
      const accessToken = jwt.sign(
        {
          email: user.email,
          userId: user.id,
        },
        process.env.JWT_KEY,
        { expiresIn: '1h' }
      );
      forbiddenLogger(req);
      res.status(200).json({
        success: true,
        message: 'user logged in successfully',
        accessToken: accessToken,
      });
      okLogger(req);
    } else {
      return res.status(403).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
  } catch (err) {
    next(err);
  }
};

/**
 * @description   fetch all users
 * @route         GET => api/v1/users/
 * @access        Public
 */

const fetchAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    if (!users) {
      notFoundLogger(req);
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
    okLogger(req);
  } catch (err) {
    next(err);
  }
};

/**
 * @description   To fetch a user by id
 * @route         GET => api/v1/user/
 * @access        Public
 */

const fetchUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const fetchedUser = await User.findByPk(userId);
    if (!fetchedUser) {
      notFoundLogger(req);
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
    okLogger(req);
  } catch (err) {
    next(err);
  }
};

/**
 * @description   To delete a user by id
 * @route         POST => api/v1/users/
 * @access        Private
 */

const deleteUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.destroy({ where: { id: userId } });
    if (!deletedUser) {
      notFoundLogger(req);
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
    okLogger(req);
  } catch (err) {
    next(err);
  }
};

/**
 * @description   To delete a update by id
 * @route         POST => api/v1/users/
 * @access        Private
 */

const updateUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const body = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    if (body.password) {
      const saltRounds = 10;
      const salt = await genSalt(saltRounds);
      body.password = await hash(body.password, salt);
    }
    const updatedUser = await User.update(body, { where: { id: userId } });
    if (!updatedUser[0]) {
      notFoundLogger(req);
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
    okLogger(req);
  } catch (err) {
    next(err);
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
