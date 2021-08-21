const { Book } = require('../models');
const {
  createBookValidationSchema,
  updateBookValidationSchema,
} = require('../validations/schemas');
const Validator = require('fastest-validator');

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

const createBook = async (req, res) => {
  try {
    const reqBody = {
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      isbn: req.body.isbn,
      publisher: req.body.publisher,
      price: req.body.price,
    };
    const v = new Validator();
    const validationResponse = v.validate(reqBody, createBookValidationSchema);
    if (validationResponse !== true) {
      return res.status(400).json({
        success: false,
        message: 'invalid inputs',
        errors: validationResponse,
      });
    }
    const createdBook = await Book.create(reqBody);
    res.status(201).json({
      success: true,
      message: 'book created successfully',
      result: createdBook,
    });
  } catch (err) {
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

const updateBookById = async (req, res) => {
  try {
    const id = req.params.id;
    const reqBody = {
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      isbn: req.body.isbn,
      publisher: req.body.publisher,
      price: req.body.price,
    };
    const v = new Validator();
    const validationResponse = v.validate(reqBody, updateBookValidationSchema);
    if (validationResponse !== true) {
      return res.status(400).json({
        success: false,
        message: 'invalid inputs',
        errors: validationResponse,
      });
    }
    const updatedBook = await Book.update(reqBody, {
      where: {
        id: id,
      },
    });
    if (!updatedBook[0]) {
      return res.status(404).json({
        success: false,
        message: `book with id ${id} not in the database`,
        result: {},
      });
    }
    res.status(200).json({
      success: true,
      message: `book with id ${id} updated successfully`,
      result: reqBody,
    });
  } catch (err) {
    console.log(err);
    if (err.errors[0].type === 'unique violation') {
      return res.status(409).json({
        success: false,
        message: 'ISBN must be unique',
        error: err,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'something went wrong',
        error: err,
      });
    }
  }
};

const deleteBookById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBook = await Book.destroy({ where: { id: id } });
    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: `book with id ${id} not found in the database`,
        error: err,
      });
    }
    res.status(200).json({
      success: true,
      message: `book with id ${id} deleted successfully`,
      result: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

module.exports = {
  createBook,
  fetchAllBooks,
  fetchedBookById,
  updateBookById,
  deleteBookById,
};
