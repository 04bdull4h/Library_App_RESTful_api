const { Book, Author } = require('../models');
const {
  okLogger,
  createdLogger,
  notFoundLogger,
  badRequestLogger,
} = require('../utils/loggerMethods');
const { validationResult } = require('express-validator');

/**
 * @description   To fetch all books
 * @route         GET => api/v1/books
 * @access        Public
 */

const fetchAllBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll();
    if (!books) {
      return res.status(404).json({
        success: false,
        message: `There is no books in the database right now not`,
        data: {},
      });
    }
    okLogger(req);
    res.status(200).json({
      success: true,
      message: 'Books fetched successfully',
      data: books,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description   To fetch a book by id
 * @route         GET => api/v1/books/:id
 * @access        Public
 */

const fetchBookById = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findByPk(bookId);
    if (!book) {
      notFoundLogger(req);
      return res.status(404).json({
        success: false,
        message: `Book with id ${bookId} not found in the database`,
        data: {},
      });
    }
    okLogger(req);
    res.status(200).json({
      success: true,
      message: `Book with id ${bookId} fetched successfully`,
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description   To create a new book
 * @route         POST => api/v1/books/
 * @access        Private
 */

const createBook = async (req, res, next) => {
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
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      isbn: req.body.isbn,
      publisher: req.body.publisher,
      price: req.body.price,
      status: req.body.status,
      AuthorId: req.body.AuthorId,
    };
    const isAuthorExists = await Author.findByPk(body.AuthorId);
    if (!isAuthorExists) {
      notFoundLogger(req);
      return res.status(404).json({
        success: false,
        message: `Author with id ${AuthorId} not found in the database`,
        data: {},
      });
    }
    const createdBook = await Book.create(body);
    createdLogger(req);
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: createdBook,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description   To update a book by id
 * @route         UPDATE => api/v1/books/:id
 * @access        Private
 */

const updateBookById = async (req, res, next) => {
  try {
    const bookId = req.params.id;
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
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      isbn: req.body.isbn,
      publisher: req.body.publisher,
      price: req.body.price,
      status: req.body.status,
    };
    const book = await Book.findByPk(bookId);
    if (!book) {
      notFoundLogger(req);
      return res.status(404).json({
        success: false,
        message: `Book with id ${bookId} not found in the database`,
        data: {},
      });
    }
    await Book.update(body, {
      where: {
        id: bookId,
      },
    });
    okLogger(req);
    res.status(200).json({
      success: true,
      message: `Book with id ${bookId} updated successfully`,
      data: body,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description   To delete a book by id
 * @route         UPDATE => api/v1/books/:id
 * @access        Private
 */

const deleteBookById = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const deletedBook = await Book.destroy({ where: { id: bookId } });
    if (!deletedBook) {
      notFound(req);
      return res.status(404).json({
        success: false,
        message: `Book with id ${bookId} not found in the database`,
        data: {},
      });
    }
    okLogger(req);
    res.status(200).json({
      success: true,
      message: `Book with id ${id} deleted successfully`,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBook,
  fetchAllBooks,
  fetchBookById,
  updateBookById,
  deleteBookById,
};
