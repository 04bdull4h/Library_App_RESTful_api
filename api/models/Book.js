module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Books', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The title is required',
        },
        len: {
          args: [3, 30],
          msg: 'The title should be between 3 and 30 characters long',
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The description is required',
        },
        len: {
          args: [30, 300],
          msg: 'The description should be between 30 and 300 characters long',
        },
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The author is required',
        },
        len: {
          args: [4, 64],
          msg: "The author's name should be between 4 and 64 characters long",
        },
      },
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'ISBN already exists in the database',
      },
      validate: {
        notNull: {
          msg: 'The ISBN is required',
        },
        len: {
          args: [10, 13],
          msg: 'The ISBN should be between 10 and 13 characters long',
        },
      },
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The publisher is required',
        },
        len: {
          args: [4, 64],
          msg: "The publisher's name should be between 4 and 64 characters long",
        },
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The price is required',
        },
        isFloat: {
          msg: 'The price should be float',
        },
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The status is required',
        },
      },
    },
  });

  Book.associate = (models) => {
    Book.belongsTo(models.Author, { foreignKey: 'authorId' });
  };

  return Book;
};
