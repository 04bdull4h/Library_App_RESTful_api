module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Books', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
    price: {
      type: DataTypes.FLOAT,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
  });
  return Book;
};
