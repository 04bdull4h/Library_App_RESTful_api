const { Book, Author } = require('../models/');

const createAuthor = async (req, res) => {
  try {
    const reqBody = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    };
    const createdAuthor = await Author.create(reqBody);
    res.status(201).json({
      success: true,
      message: 'author created successfully',
      result: createdAuthor,
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
      result: books,
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
      result: authors,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'server issue',
      error: err.errors.map((e) => e.message),
    });
  }
};
const fetchAuthorById = async (req, res) => {
  try {
    const authorId = req.params.id;
    const author = await Author.findByPk(authorId);
    if (!author) {
      return res.status(404).json({
        success: false,
        message: `author with id ${authorId} no found`,
        result: {},
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

module.exports = {
  createAuthor,
  fetchAllAuthors,
  fetchAuthorById,
  fetchAllBooksByAuthorId,
};
