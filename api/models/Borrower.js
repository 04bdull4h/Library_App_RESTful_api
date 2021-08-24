module.exports = (sequelize, DataTypes) => {
  const Borrower = sequelize.define('Borrowers', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
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
  return Borrower;
};
