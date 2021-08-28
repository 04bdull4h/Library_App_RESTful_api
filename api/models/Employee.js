module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employees', {
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
    jobTitle: {
      type: DataTypes.STRING,
    },
    department: {
      type: DataTypes.STRING,
    },
    salary: {
      type: DataTypes.FLOAT,
    },
    hireDate: {
      type: DataTypes.DATEONLY,
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email already exists',
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Phone number already exists',
      },
    },
  });
  return Employee;
};
