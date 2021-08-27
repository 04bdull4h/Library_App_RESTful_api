module.exports = (sequelize, DataTypes) => {
  const BorrowedBook = sequelize.define('BorrowedBooks', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    author: {
      type: DataTypes.STRING,
    },
    isbn: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'ISBN already exists in the database',
      },
    },
    publisher: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    issueDate: {
      type: DataTypes.DATEONLY,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
    },
  });
  return BorrowedBook;
};
