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
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email already exists',
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Phone number already exists',
      },
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
