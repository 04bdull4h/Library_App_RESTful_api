const { Book } = require('../models');
const { bookValidationSchema } = require('../validations/schemas');
const Validator = require('fastest-validator');
const boom = require('@hapi/boom');

const createBook = async (req, res) => {
  try {
    const createdBook = {
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      isbn: req.body.isbn,
      publisher: req.body.publisher,
      price: req.body.price,
    };
    const v = new Validator();
    const validationResponse = v.validate(createdBook, bookValidationSchema);
    if (validationResponse !== true) {
      return res.status(400).json({
        success: false,
        message: 'invalid inputs',
        errors: validationResponse,
      });
    }
    const query = await Book.create(createdBook);
    res.status(201).json({
      success: true,
      message: 'book created successfully',
      result: query,
    });
  } catch (err) {
    throw boom.boomify(err, { statusCode: 500 });
  }
};

const fetchAllBooks = async () => {};
const fetchedBookById = async () => {};
const updateBookById = async () => {};
const deleteBookById = async () => {};

module.exports = {
  createBook,
  fetchAllBooks,
  fetchedBookById,
  updateBookById,
  deleteBookById,
};
