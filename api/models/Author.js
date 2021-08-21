module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Authors', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The first name is required',
        },
        len: {
          args: [2, 55],
          msg: 'First name should between 2 and 55 characters long',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The last name is required',
        },
        len: {
          args: [2, 55],
          msg: 'Last name should between 2 and 55 characters long',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already exists in the database',
      },
      validate: {
        notNull: {
          msg: 'The email is required',
        },
        isEmail: {
          msg: 'You should provide a valid email',
        },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Phone number already exists in the database',
      },
      validate: {
        notNull: {
          msg: 'The phone number is required',
        },
      },
    },
  });

  return Author;
};
