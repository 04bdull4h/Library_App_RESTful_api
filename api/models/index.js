const Sequelize = require('sequelize');
const db = require('../../config/db');
const BookModel = require('../models/Book');
const AuthorModel = require('../models/Author');
const UserModel = require('../models/User');
const PublisherModel = require('../models/Publisher');

/*--------------- Setting up models ---------------*/

const Book = BookModel(db, Sequelize);
const Author = AuthorModel(db, Sequelize);
const User = UserModel(db, Sequelize);
const Publisher = PublisherModel(db, Sequelize);

/*--------------- Setting up One-To-Many relationships ---------------*/

Author.hasMany(Book, {
  foreignKey: {
    type: Sequelize.DataTypes.UUID,
    allowNull: false,
  },
});

Book.belongsTo(Author);

/*--------------- Setting up Many-To-Many relationships ---------------*/

Publisher.belongsToMany(Book, { as: 'Book', through: 'Publishers_Books' });
Book.belongsToMany(Publisher, { through: 'Publishers_Books' });

/*--------------- Setting database sync ---------------*/

db.sync({ force: false });
module.exports = {
  Book,
  Author,
  User,
  Publisher,
};
