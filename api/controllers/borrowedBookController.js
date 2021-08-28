const { BorrowedBook, Borrower } = require('../models');
const { validationResult } = require('express-validator');
const {
  okLogger,
  createdLogger,
  badRequestLogger,
  notFoundLogger,
} = require('../utils/loggerMethods');

/**
 * @description   To fetch all borrowed books
 * @route         GET => api/v1/borrowed-books/
 * @access        Public
 */

const fetchAllBorrowedBooks = async (req, res, next) => {
  try {
    const borrowedBooks = await BorrowedBook.findAll();
    if (!borrowedBooks) {
      return res.status(404).json({
        success: false,
        message: `There is no borrowed books in the database right now not`,
        data: {},
      });
    }
    okLogger();
    res.status(200).json({
      success: true,
      message: 'Borrowed books fetched successfully',
      data: borrowedBooks,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description   To fetch all borrowed book by id
 * @route         GET => api/v1/borrowed-books/:id
 * @access        Public
 */

const fetchAllBorrowedBookById = async (req, res, next) => {
  try {
    const borrowedBookId = req.params.id;
    const borrowedBook = await Book.findByPk(borrowedBookId);
    if (!borrowedBook) {
      notFoundLogger(req);
      return res.status(404).json({
        success: false,
        message: `Borrowed book with id ${borrowedBookId} not found in the database`,
        data: {},
      });
    }
    okLogger(req);
    res.status(200).json({
      success: true,
      message: `Borrowed book with id ${borrowedBookId} fetched successfully`,
      data: borrowedBook,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description   To create borrowed book
 * @route         POST => api/v1/borrowed-books/
 * @access        Private
 */

const createBorrowedBook = async (req, res, next) => {
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
      status: req.body.status,
      issueDate: req.body.issueDate,
      dueDate: req.body.dueDate,
      BorrowerId: req.body.BorrowerId,
    };
    const isBorrowerExists = await Borrower.findByPk(body.BorrowerId);
    if (!isBorrowerExists) {
      notFoundLogger(req);
      return res.status(404).json({
        success: false,
        message: `Borrower with id ${body.BorrowerId} not found in the database`,
        data: {},
      });
    }
    const createdBook = await BorrowedBook.create(body);
    createdLogger(req);
    res.status(201).json({
      success: true,
      message: `Borrowed Book related to the borrower with id ${body.BorrowerId} created successfully`,
      data: createdBook,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description   To update a borrowed book by id
 * @route         PUT => api/v1/borrowed-books/:id
 * @access        Private (needs an access token)
 */

const updateBorrowedBook = async (req, res, next) => {
  try {
    const borrowedBookId = req.params.id;
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
      status: req.body.status,
      issueDate: req.body.issueDate,
      dueDate: req.body.dueDate,
      BorrowerId: req.body.BorrowerId,
    };
    const isBorrowerExists = await Borrower.findByPk(body.BorrowerId);
    if (!isBorrowerExists) {
      notFoundLogger(req);
      return res.status(404).json({
        success: false,
        message: `Borrower with id ${body.BorrowerId} not found in the database`,
        data: {},
      });
    }
    await BorrowedBook.update(body, {
      where: {
        id: borrowedBookId,
      },
    });
    okLogger(req);
    res.status(200).json({
      success: true,
      message: `Borrowed book with id ${borrowedBookId} updated successfully`,
      data: body,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description   To delete a borrowed book by id
 * @route         DELETE => api/v1/borrowed-books/:id
 * @access        Private (needs an access token)
 */

const deleteBorrowedBook = async (req, res, next) => {
  try {
    const borrowedBookId = req.params.id;
    const deletedBorrowedBook = await Book.destroy({
      where: { id: borrowedBookId },
    });
    if (!deletedBorrowedBook) {
      notFound(req);
      return res.status(404).json({
        success: false,
        message: `Borrowed book with id ${borrowedBookId} not found in the database`,
        data: {},
      });
    }
    okLogger(req);
    res.status(200).json({
      success: true,
      message: `Borrowed book with id ${id} deleted successfully`,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  fetchAllBorrowedBookById,
  fetchAllBorrowedBooks,
  createBorrowedBook,
  updateBorrowedBook,
  deleteBorrowedBook,
};
