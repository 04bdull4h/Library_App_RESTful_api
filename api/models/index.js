const Sequelize = require('sequelize');
const db = require('../../config/db');
const BookModel = require('../models/Book');
const AuthorModel = require('../models/Author');

const Book = BookModel(db, Sequelize);
const Author = AuthorModel(db, Sequelize);

db.sync({ force: false });
module.exports = {
  Book,
  Author,
};
