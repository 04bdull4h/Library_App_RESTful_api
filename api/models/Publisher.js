module.exports = (sequelize, DataTypes) => {
  const Publisher = sequelize.define('Publishers', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    specialization: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'ISBN already exists in the database',
      },
    },
  });
  return Publisher;
};
