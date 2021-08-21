module.exports = (db, DataType) => {
  return db.define('books', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataType.STRING,
      allowNull: false,
    },
    description: {
      type: DataType.STRING,
      allowNull: false,
    },
    author: {
      type: DataType.STRING,
      allowNull: false,
    },
    isbn: {
      type: DataType.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'ISBN already exists in the database',
      },
    },
    publisher: {
      type: DataType.STRING,
      allowNull: false,
    },
    price: {
      type: DataType.FLOAT,
      allowNull: false,
    },
  });
};
