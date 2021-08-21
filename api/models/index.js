const Sequelize = require('sequelize');
const db = require('../../config/db');
const BookModel = require('../models/Book');

const Book = BookModel(db, Sequelize);

db.sync({ force: false });
module.exports = {
  Book,
};
