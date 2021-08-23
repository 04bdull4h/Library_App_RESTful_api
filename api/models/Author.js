module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Authors', {
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
        msg: 'Email already exists in the database',
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Phone number already exists in the database',
      },
    },
  });
  return Author;
};
