const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

/*--------- Setting up morgan middleware ---------*/
app.use(morgan('dev'));

/*--------- Setting up cors middleware ---------*/
app.use(cors());

const db = require('./config/db');
const dbConnection = async () => {
  try {
    await db.authenticate();
    console.log(
      `MySQL database connection has been established successfully`.bgBlue.black
    );
  } catch (err) {
    console.log(`MySQL database connection has been failed due to ${err}`);
  }
};

dbConnection();

/*--------- Setting up express body parser middleware ---------*/

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

module.exports = app;
