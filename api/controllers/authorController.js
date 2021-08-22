const { Book, Author } = require('../models/');
const {
  okLogger,
  createdLogger,
  notFoundLogger,
} = require('../utils/loggerMethods');

/**
 * @description   To create an author
 * @route         POST => api/v1/authors
 * @access        Private
 */

const createAuthor = async (req, res, next) => {
  try {
    const body = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    };
    const createdAuthor = await Author.create(body);
    createdLogger(req);
    res.status(201).json({
      success: true,
      message: 'author created successfully',
      data: createdAuthor,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description   To fetch all books related to an author by its id
 * @route         GET => api/v1/author/:id/books
 * @access        Public
 */

const fetchAllBooksByAuthorId = async (req, res, next) => {
  try {
    const authorId = req.params.id;
    const author = await Author.findByPk(authorId);
    if (!author) {
      notFoundLogger(req);
      return res.status(404).json({
        success: false,
        message: `Author with id ${authorId} not found in the database`,
        data: {},
      });
    }
    const books = await Author.findAll({
      where: { id: authorId },
      include: [Book],
    });
    okLogger(req);
    res.status(200).json({
      success: true,
      message: `Book related to author with id ${authorId} fetched successfully`,
      data: books,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description   To fetch all authors
 * @route         GET => api/v1/books/
 * @access        Public
 */

const fetchAllAuthors = async (req, res, next) => {
  try {
    const authors = await Author.findAll();
    if (!authors) {
      notFoundLogger(req);
      return res.status(404).json({
        success: false,
        message: `There is no authors in the database right now not`,
        data: {},
      });
    }
    okLogger(req);
    res.status(200).json({
      success: true,
      message: 'authors fetched successfully',
      data: authors,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @description   To fetch a author by id
 * @route         GET => api/v1/authors/:id
 * @access        Public
 */

const fetchAuthorById = async (req, res, next) => {
  try {
    const authorId = req.params.id;
    const author = await Author.findByPk(authorId);
    if (!author) {
      notFoundLogger(req);
      return res.status(404).json({
        success: false,
        message: `Author with id ${authorId} not found in the database`,
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: `author with id ${authorId} fetched successfully`,
      result: author,
    });
    okLogger(req);
  } catch (err) {
    next(err);
  }
};

/**
 * @description   To update an author by id
 * @route         UPDATE => api/v1/authors/:id
 * @access        Private
 */

const updateAuthorById = async (req, res, next) => {
  try {
    const authorId = req.params.id;
    const reqBody = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    };
    const updatedAuthor = await Author.update(reqBody, {
      where: { id: authorId },
    });
    if (!updatedAuthor[0]) {
      notFoundLogger(req);
      return res.status(404).json({
        success: false,
        message: `Author with id ${authorId} not found in the database`,
        data: {},
      });
    }
    okLogger(req);
    res.status(200).json({
      success: true,
      message: `author with id ${authorId} updated successfully`,
      data: reqBody,
    });
  } catch (err) {
    next(error);
  }
};

/**
 * @description   To delete an author by id
 * @route         DELETE => api/v1/authors/:id
 * @access        Private
 */

const deleteAuthorById = async (req, res, next) => {
  try {
    const authorId = req.params.id;
    const deletedAuthor = await Author.destroy({ where: { id: authorId } });
    console.log(deletedAuthor);
    if (!deletedAuthor) {
      notFoundLogger(req);
      return res.status(404).json({
        success: false,
        message: `Author with id ${authorId} not found in the database`,
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: `user with id ${authorId} deleted successfully`,
    });
    okLogger(req);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createAuthor,
  fetchAllAuthors,
  fetchAuthorById,
  fetchAllBooksByAuthorId,
  updateAuthorById,
  deleteAuthorById,
};
