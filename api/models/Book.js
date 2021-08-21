module.exports = (db, DataType) => {
  return db.define('books', {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The id is required',
        },
        isUUID: {
          args: 4,
          msg: 'The id must be a UUID4 string',
        },
      },
    },
    title: {
      type: DataType.STRING,
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
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The description is required',
        },
        len: {
          args: [30, 300],
          msg: 'The description should be between 30 and 30 characters long',
        },
      },
    },
    author: {
      type: DataType.STRING,
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
      type: DataType.STRING,
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
      type: DataType.STRING,
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
      type: DataType.FLOAT,
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
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: {
        notNull: {
          msg: 'The status is required',
        },
      },
    },
  });
};
