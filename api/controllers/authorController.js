const { Book, Author } = require('../models/');

/**
 * @description   To create an author
 * @route         POST => api/v1/authors
 * @access        Private
 */

const createAuthor = async (req, res) => {
  try {
    const body = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    };
    const createdAuthor = await Author.create(body);
    res.status(201).json({
      success: true,
      message: 'author created successfully',
      data: createdAuthor,
    });
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'validation errors',
        errors: err.errors.map((e) => e.message),
      });
    }
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        success: false,
        message: err.errors.map((e) => e.message),
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'server issue',
        error: err.errors.map((e) => e.message),
      });
    }
  }
};

/**
 * @description   To fetch all books related to an author by its id
 * @route         GET => api/v1/author/:id/books
 * @access        Public
 */

const fetchAllBooksByAuthorId = async (req, res) => {
  try {
    const authorId = req.body.AuthorId;
    const books = await Author.findAll({
      where: { id: authorId },
      include: [Book],
    });
    res.status(201).json({
      success: true,
      message: `Book related to author with id ${authorId} fetched successfully`,
      data: books,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'server issue',
      error: err,
    });
  }
};

/**
 * @description   To fetch all authors
 * @route         GET => api/v1/books/
 * @access        Public
 */

const fetchAllAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll();
    if (!authors) {
      return res.status(404).json({
        success: false,
        error: 'There is no authors right now in the database',
        result: {},
      });
    }
    res.status(200).json({
      success: true,
      message: 'authors fetched successfully',
      data: authors,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'server issue',
      error: err.errors.map((e) => e.message),
    });
  }
};

/**
 * @description   To fetch a author by id
 * @route         GET => api/v1/authors/:id
 * @access        Public
 */

const fetchAuthorById = async (req, res) => {
  try {
    const authorId = req.params.id;
    const author = await Author.findByPk(authorId);
    if (!author) {
      return res.status(404).json({
        success: false,
        message: `author with id ${authorId} no found`,
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: `author with id ${authorId} fetched successfully`,
      result: author,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'server issue',
      error: err.errors.map((e) => e.message),
    });
  }
};

const updateAuthorById = async (req, res) => {
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
    console.log(updatedAuthor);
    if (!updatedAuthor[0]) {
      return res.status(404).json({
        success: false,
        message: `author with id ${authorId} not in the database`,
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: `author with id ${authorId} updated successfully`,
      data: reqBody,
    });
  } catch (err) {
    console.log(err);
    if (err.type === 'unique violation') {
      return res.status(409).json({
        success: false,
        message: err.message,
        error: err.errors.map((e) => e.message),
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'server issue',
        error: err.errors.map((e) => e.message),
      });
    }
  }
};

const deleteAuthorById = async (req, res) => {
  try {
    const authorId = req.params.id;
    const deletedAuthor = await Author.destroy({ where: { id: authorId } });
    if (!deletedAuthor) {
      return res.status(404).json({
        success: false,
        message: `user with id ${authorId} not found in the database`,
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: `user with id ${authorId} deleted successfully`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'server issue',
      error: err.errors.map((e) => e.message),
    });
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
