const { Book, Author } = require('../models');
const {
  created,
  conflict,
  badRequest,
  internalServerError,
} = require('../utils/loggerMethods');

/**
 * @description   To fetch all books
 * @route         GET => api/v1/books
 * @access        Public
 */

const fetchAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    if (!books) {
      notFound(req);
      return res.status(404).json({
        success: false,
        error: 'There is no books right now in the database',
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: 'books fetched successfully',
      data: books,
    });
    ok(req);
  } catch (err) {
    internalServerError(req);
    return res.status(500).json({
      success: false,
      message: 'server issue',
      error: err.errors.map((e) => e.message),
    });
  }
};

/**
 * @description   To fetch a book by id
 * @route         GET => api/v1/books/:id
 * @access        Public
 */

const fetchBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findByPk(bookId);
    if (!book) {
      notFound(req);
      return res.status(404).json({
        success: false,
        message: `book with id ${bookId} not in the database`,
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: 'user fetched successfully',
      data: book,
    });
    ok(req);
  } catch (err) {
    internalServerError(req);
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'server issue',
      error: err,
    });
  }
};

/**
 * @description   To create a new book
 * @route         POST => api/v1/books/
 * @access        Private
 */

const createBook = async (req, res) => {
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
      notFound(req);
      return res.status(404).json({
        success: false,
        message: `author with id ${reqBody.AuthorId} not found`,
      });
    }
    const createdBook = await Book.create(reqBody);
    res.status(201).json({
      success: true,
      message: 'book created successfully',
      result: createdBook,
    });
    created(req);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      badRequest(req);
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: err.errors.map((e) => e.message),
      });
    }
    if (err.name === 'SequelizeUniqueConstraintError') {
      conflict(req);
      return res.status(409).json({
        success: false,
        message: err.errors.map((e) => e.message),
      });
    } else {
      internalServerError(req);
      return res.status(500).json({
        success: false,
        message: 'server issue',
        error: err.errors.map((e) => e.message),
      });
    }
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
      notFound(req);
      return res.status(404).json({
        success: false,
        message: `book with id ${bookId} not in the database`,
        result: {},
      });
    }
    res.status(200).json({
      success: true,
      message: `book with id ${bookId} updated successfully`,
      data: reqBody,
    });
    ok(req);
  } catch (err) {
    if (err.errors[0].type === 'unique violation') {
      badRequest(req);
      return res.status(409).json({
        success: false,
        message: 'ISBN must be unique',
        error: err.errors.map((e) => e.message),
      });
    } else {
      internalServerError(req);
      return res.status(500).json({
        success: false,
        message: 'server issue',
        error: err.errors.map((e) => e.message),
      });
    }
  }
};

/**
 * @description   To delete a book by id
 * @route         UPDATE => api/v1/books/:id
 * @access        Private
 */

const deleteBookById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBook = await Book.destroy({ where: { id: id } });
    if (!deletedBook) {
      notFound(req);
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
    ok(req);
  } catch (err) {
    internalServerError(req);
    return res.status(500).json({
      success: false,
      message: 'server issue',
      error: err.errors.map((e) => e.message),
    });
  }
};

module.exports = {
  createBook,
  fetchAllBooks,
  fetchBookById,
  updateBookById,
  deleteBookById,
};
