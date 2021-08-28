const { BorrowedBook, Borrower } = require('../models');
const { validationResult } = require('express-validator');
const {
  okLogger,
  createdLogger,
  badRequestLogger,
  notFoundLogger,
} = require('../utils/loggerMethods');

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

const getAllBorrowedBooks = async (req, res, next) => {
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

const getAllBorrowedBookById = async (req, res, next) => {
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

const getAllBorrowedBooksByBorrowerId = async (req, res, next) => {
  try {
    const borrowerId = req.params.id;
    const borrower = await Author.findByPk(borrowerId);
    if (!borrower) {
      notFoundLogger(req);
      return res.status(404).json({
        success: false,
        message: `Borrower with id ${borrowerId} not found in the database`,
        data: {},
      });
    }
    const borrowedBooks = await Borrower.findAll({
      where: { id: borrowerId },
      include: [
        {
          model: BorrowedBook,
        },
      ],
    });
    okLogger(req);
    res.status(200).json({
      success: true,
      message: `Borrowed books related to borrower with id ${borrowerId} fetched successfully`,
      data: borrowedBooks,
    });
  } catch (err) {
    next(err);
  }
};

const getAllBorrowedBooks = async (req, res, next) => {
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
  createBorrowedBook,
  getAllBorrowedBookById,
  getAllBorrowedBooks,
  getAllBorrowedBooksByBorrowerId,
  updateBorrowedBook,
  deleteBorrowedBook,
};
