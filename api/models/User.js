module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
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
    username: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Username is already exists',
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Email is already exists',
      },
    },
    password: {
      type: DataTypes.STRING,
    },
  });
  return User;
};
