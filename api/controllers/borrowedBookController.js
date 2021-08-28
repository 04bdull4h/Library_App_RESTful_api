const { BorrowedBook, Borrower } = require('../models');

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

const getAllBorrowedBooks = async () => {};
const getAllBorrowedBookById = async () => {};
const getAllBorrowedBooksByBorrowerId = async () => {};
const updateBorrowedBook = async () => {};
const deleteBorrowedBook = async () => {};

module.exports = {
  createBorrowedBook,
  getAllBorrowedBookById,
  getAllBorrowedBooks,
  getAllBorrowedBooksByBorrowerId,
  updateBorrowedBook,
  deleteBorrowedBook,
};
