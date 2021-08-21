const Sequelize = require('sequelize');
const db = require('../../config/db');
const BookModel = require('../models/Book');
const AuthorModel = require('../models/Author');

const Book = BookModel(db, Sequelize);
const Author = AuthorModel(db, Sequelize);

Author.hasMany(Book, {
  foreignKey: {
    type: Sequelize.DataTypes.UUID,
    allowNull: false,
  },
});

Book.belongsTo(Author);

db.sync({ force: false });
module.exports = {
  Book,
  Author,
};
