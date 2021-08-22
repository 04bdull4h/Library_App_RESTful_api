const { User } = require('../models');
const { genSalt, hash, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        'hello'
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
const updateUserById = async (req, res) => {
  try {
  } catch (err) {}
};

module.exports = {
  register,
  login,
  fetchAllUsers,
  fetchUserById,
  deleteUserById,
};
