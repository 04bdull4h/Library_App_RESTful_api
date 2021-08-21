const { Book } = require('../models');
const { bookValidationSchema } = require('../validations/schemas');
const Validator = require('fastest-validator');
const boom = require('@hapi/boom');

const createBook = async (req, res) => {
  try {
    const query = {
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      isbn: req.body.isbn,
      publisher: req.body.publisher,
      price: req.body.price,
    };
    const v = new Validator();
    const validationResponse = v.validate(query, bookValidationSchema);
    if (validationResponse !== true) {
      return res.status(400).json({
        success: false,
        message: 'invalid inputs',
        errors: validationResponse,
      });
    }
    const createdBook = await Book.create(query);
    res.status(201).json({
      success: true,
      message: 'book created successfully',
      result: createdBook,
    });
  } catch (err) {
    console.log(err);
    if (err.errors[0].type === 'unique violation') {
      return res.status(409).json({
        success: false,
        message: 'ISBN must be unique',
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'something went wrong',
      });
    }
  }
};

const fetchAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    if (!books) {
      return res.status(404).json({
        success: false,
        error: 'There is no books right now in the database',
        result: {},
      });
    }
    res.status(200).json({
      success: false,
      message: 'books fetched successfully',
      result: books,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'something went wrong',
    });
  }
};

const fetchedBookById = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: `book with id ${id} not in the database`,
        result: {},
      });
    }
    res.status(200).json({
      success: true,
      message: 'user fetched successfully',
      result: book,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'something went wrong',
    });
  }
};

const updateBookById = async () => {
  try {
  } catch (err) {}
};
const deleteBookById = async () => {
  try {
  } catch (err) {}
};

module.exports = {
  createBook,
  fetchAllBooks,
  fetchedBookById,
  updateBookById,
  deleteBookById,
};
