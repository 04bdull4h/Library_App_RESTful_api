const { Borrower, BorrowedBook } = require('../models');
const { validationResult } = require('express-validator');
const {
  okLogger,
  createdLogger,
  badRequestLogger,
  notFoundLogger,
} = require('../utils/loggerMethods');

const fetchAllBorrowers = async (req, res, next) => {
  try {
    const borrowers = await Borrower.findAll();
    if (!borrowers) {
      return res.status(404).json({
        success: false,
        message: `There is no borrowers in the database right now not`,
        data: {},
      });
    }
    okLogger(req);
    res.status(200).json({
      success: true,
      message: 'Borrowers fetched successfully',
      data: borrowers,
    });
  } catch (err) {
    next(err);
  }
};

const fetchBorrowerById = async (req, res, next) => {
  try {
    const borrowerId = req.params.id;
    const borrower = await Borrower.findByPk(borrowerId);
    if (!borrower) {
      notFoundLogger(req);
      return res.status(404).json({
        success: false,
        message: `Borrower with id ${borrowerId} not found in the database`,
        data: {},
      });
    }
    okLogger(req);
    res.status(200).json({
      success: true,
      message: `Borrower with id ${borrowerId} fetched successfully`,
      data: borrower,
    });
  } catch (err) {
    next(err);
  }
};

const fetchAllBorrowedBooksByBorrowerId = async (req, res, next) => {
  try {
    const borrowerId = req.params.id;
    const borrower = await Borrower.findByPk(borrowerId);
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

const createBorrower = async (req, res, next) => {
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
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      issueDate: req.body.issueDate,
      dueDate: req.body.dueDate,
    };
    const createdBorrower = await Borrower.create(body);
    createdLogger(req);
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: createdBorrower,
    });
  } catch (err) {
    next(err);
  }
};

const updateBorrowerById = async () => {
  try {
    const borrowerId = req.params.id;
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
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      issueDate: req.body.issueDate,
      dueDate: req.body.dueDate,
    };

    const borrower = await Borrower.findByPk(borrowerId);
    if (!borrower) {
      notFoundLogger(req);
      return res.status(404).json({
        success: false,
        message: `Borrower with id ${borrowerId} not found in the database`,
        data: {},
      });
    }
    await Book.update(body, {
      where: {
        id: borrowerId,
      },
    });
    okLogger(req);
    res.status(200).json({
      success: true,
      message: `Book with id ${borrowerId} updated successfully`,
      data: body,
    });
  } catch (err) {
    next(err);
  }
};

const deleteBorrowerById = async () => {
  try {
  } catch (err) {}
};

module.exports = {
  createBorrower,
  fetchAllBorrowers,
  fetchBorrowerById,
  fetchAllBorrowedBooksByBorrowerId,
  updateBorrowerById,
  deleteBorrowerById,
};
