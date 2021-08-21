module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Authors', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
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
      validate: {
        notNull: {
          msg: 'The phone number is required',
        },
      },
    },
  });

  Author.associate = (models) => {
    User.hasMany(
      models.Book,
      { as: 'books' },
      {
        onDelete: 'cascade',
      }
    );
  };

  return Author;
};
