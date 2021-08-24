const { Publisher, Book } = require('../models');
const { validationResult } = require('express-validator');
const {
  okLogger,
  createdLogger,
  badRequestLogger,
  notFoundLogger,
} = require('../utils/loggerMethods');

/**
 * @description   To fetch all publishers
 * @route         GET => api/v1/publishers
 * @access        Public
 */

const fetchAllPublishers = async (req, res, next) => {
  try {
    const publishers = await Publisher.findAll();
    if (!publishers) {
      return res.status(404).json({
        success: false,
        message: `There is no publishers in the database right now not`,
        data: {},
      });
    }
    okLogger(req);
    res.status(200).json({
      success: true,
      message: 'Publishers fetched successfully',
      data: publishers,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description   To fetch publisher by id
 * @route         GET => api/v1/publishers/:id
 * @access        Public
 */

const fetchPublisherById = async (req, res, next) => {
  try {
    const publisherId = req.params.id;
    const publisher = await Publisher.findByPk(publisherId);
    if (!publisher) {
      notFoundLogger(req);
      return res.status(404).json({
        success: false,
        message: `Publisher with id ${publisherId} not found in the database`,
        data: {},
      });
    }
    okLogger(req);
    res.status(200).json({
      success: true,
      message: `Publisher with id ${publisherId} fetched successfully`,
      data: publisher,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description   To fetch books related to a publisher by id
 * @route         GET => api/v1/publishers/:id/books
 * @access        Public
 */

const fetchAllBooksByPublisherId = async (req, res, next) => {
  try {
    const publisherId = req.params.id;
    const publisher = await Publisher.findByPk(publisherId);
    if (!publisher) {
      notFoundLogger(req);
      return res.status(404).json({
        success: false,
        message: `Publisher with id ${publisherId} not found in the database`,
        data: {},
      });
    }
    const publishers = await Publisher.findAll({
      where: { id: publisherId },
      include: [Book],
    });
    okLogger(req);
    res.status(200).json({
      success: true,
      message: `Books related to publisher with id ${publisherId} fetched successfully`,
      data: publishers,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description   To create a publisher
 * @route         POST => api/v1/publishers/:id
 * @access        Public
 */

const createPublisher = async (req, res, next) => {
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
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      specialization: req.body.specialization,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
    };
    const createdPublisher = await Publisher.create(body);
    createdLogger(req);
    res.status(201).json({
      success: true,
      message: 'Publisher created successfully',
      data: createdPublisher,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description   To update a publisher
 * @route         PUT => api/v1/publishers/:id
 * @access        Private
 */

const updatePublisherById = async (req, res, next) => {
  try {
    const publisherId = req.params.id;
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
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      specialization: req.body.specialization,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
    };
    const publisher = await Publisher.findByPk(publisherId);
    if (!publisher) {
      notFoundLogger(req);
      return res.status(404).json({
        success: false,
        message: `Publisher with id ${publisherId} not found in the database`,
        data: {},
      });
    }
    await Publisher.update(body, {
      where: {
        id: publisherId,
      },
    });
    okLogger(req);
    res.status(200).json({
      success: true,
      message: `Publisher with id ${publisherId} updated successfully`,
      data: body,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description   To delete a publisher
 * @route         DELETE => api/v1/publishers/:id
 * @access        Private
 */

const deletePublisherById = async (req, res, next) => {
  try {
    const publisherId = req.params.id;
    const deletedPublisher = await Publisher.destroy({
      where: { id: publisherId },
    });
    if (!deletedPublisher) {
      notFoundLogger(req);
      return res.status(404).json({
        success: false,
        message: `Publisher with id ${publisherId} not found in the database`,
        data: {},
      });
    }
    okLogger(req);
    res.status(200).json({
      success: true,
      message: `Publisher with id ${publisherId} deleted successfully`,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  fetchAllPublishers,
  fetchPublisherById,
  fetchAllBooksByPublisherId,
  createPublisher,
  updatePublisherById,
  deletePublisherById,
};
