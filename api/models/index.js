const Sequelize = require('sequelize');
const db = require('../../config/db');
const AuthorModel = require('../models/Author');
const UserModel = require('../models/User');
const PublisherModel = require('../models/Publisher');
const BorrowerModel = require('../models/Borrower');
const BoughtBookModel = require('./BoughtBook');
const BorrowedBookModel = require('../models/BorrowedBook');

/*--------------- Setting up models ---------------*/

const BoughtBook = BoughtBookModel(db, Sequelize);
const Author = AuthorModel(db, Sequelize);
const User = UserModel(db, Sequelize);
const Publisher = PublisherModel(db, Sequelize);
const Borrower = BorrowerModel(db, Sequelize);
const BorrowedBook = BorrowedBookModel(db, Sequelize);

/*--------------- Setting up One-To-Many relationships ---------------*/

// 1

Author.hasMany(BoughtBook, {
  foreignKey: {
    type: Sequelize.DataTypes.UUID,
    allowNull: false,
  },
});

BoughtBook.belongsTo(Author);

// 2

Borrower.hasMany(BorrowedBook, {
  foreignKey: {
    type: Sequelize.DataTypes.UUID,
    allowNull: false,
  },
});

BorrowedBook.belongsTo(Borrower);

/*--------------- Setting up Many-To-Many relationships ---------------*/

Publisher.belongsToMany(BoughtBook, {
  as: 'books',
  through: 'Publishers_Books',
});
BoughtBook.belongsToMany(Publisher, {
  as: 'publishers',
  through: 'Publishers_Books',
});

/*--------------- Setting database sync ---------------*/

db.sync({ force: false });
module.exports = {
  BoughtBook,
  Author,
  User,
  Publisher,
  Borrower,
  BorrowedBook,
};
