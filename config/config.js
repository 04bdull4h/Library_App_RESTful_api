require('dotenv').config();
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: process.env.DIALECT,
    logging: process.env.LOGGING,
    jwt_key: process.env.JWT_KEY,
    db_host: process.env.DB_HOST,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: process.env.DIALECT,
    logging: process.env.LOGGING,
    jwt_key: process.env.JWT_KEY,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: process.env.DIALECT,
    logging: process.env.LOGGING,
    jwt_key: process.env.JWT_KEY,
  },
};
