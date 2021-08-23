const { Publisher } = require('../models');

const fetchAllPublishers = async (req, res, next) => {};
const fetchPublisherById = async (req, res, next) => {};
const fetchAllBooksByPublisherId = async (req, res, next) => {};
const createPublisherById = async (req, res, next) => {
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
      message: 'Book created successfully',
      data: createdPublisher,
    });
  } catch (err) {
    next(err);
  }
};
const updatePublisherById = async (req, res, next) => {};
const deletePublisherById = async (req, res, next) => {};

module.exports = {
  fetchAllPublishers,
  fetchPublisherById,
  fetchAllBooksByPublisherId,
  createPublisherById,
  updatePublisherById,
  deletePublisherById,
};
