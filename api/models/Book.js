module.exports = (db, DataType) => {
  return db.define('books', {
    id: {
      type: type.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
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
    },
    publisher: {
      type: DataType.STRING,
      allowNull: false,
    },
    price: {
      type: DataType.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataType.BOOLEAN,
      allowNull: false,
    },
  });
};
