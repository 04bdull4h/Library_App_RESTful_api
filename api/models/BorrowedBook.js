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
    name: {
      type: DataTypes.STRING,
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