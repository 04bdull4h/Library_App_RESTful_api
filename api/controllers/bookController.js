const { Book, Author } = require('../models');
const ErrorResponse = require('../utils/errorResponse');
const {
  okLogger,
  createdLogger,
  notFoundLogger,
} = require('../utils/loggerMethods');

/**
 * @description   To fetch all books
 * @route         GET => api/v1/books
 * @access        Public
 */

const fetchAllBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll();
    if (!books) {
      notFoundLogger(req);
      return next(new ErrorResponse(`Books not found in the database`, 404));
    }
    okLogger(req);
    res.status(200).json({
      success: true,
      message: 'books fetched successfully',
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
      return next(
        new ErrorResponse(
          `Book with id ${bookId} not found in the database`,
          404
        )
      );
    }
    okLogger(req);
    res.status(200).json({
      success: true,
      message: 'user fetched successfully',
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
    const reqBody = {
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      isbn: req.body.isbn,
      publisher: req.body.publisher,
      price: req.body.price,
      status: req.body.status,
      AuthorId: req.body.AuthorId,
    };
    const author = await Author.findByPk(reqBody.AuthorId);
    if (!author) {
      notFoundLogger(req);
      return next(
        new ErrorResponse(
          `Author with id ${reqBody.AuthorId} not found in the database`,
          404
        )
      );
    }
    const createdBook = await Book.create(reqBody);
    createdLogger(req);
    res.status(201).json({
      success: true,
      message: 'book created successfully',
      result: createdBook,
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

const updateBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const reqBody = {
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      isbn: req.body.isbn,
      publisher: req.body.publisher,
      price: req.body.price,
      status: req.body.status,
    };
    const updatedBook = await Book.update(reqBody, {
      where: {
        id: bookId,
      },
    });
    if (!updatedBook[0]) {
      notFoundLogger(req);
      return next(
        new ErrorResponse(
          `Book with id ${bookId} not found in the database`,
          404
        )
      );
    }
    okLogger(req);
    res.status(200).json({
      success: true,
      message: `book with id ${bookId} updated successfully`,
      data: reqBody,
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
      return next(
        new ErrorResponse(
          `Book with id ${bookId} not found in the database`,
          404
        )
      );
    }
    okLogger(req);
    res.status(200).json({
      success: true,
      message: `book with id ${id} deleted successfully`,
      result: {},
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
