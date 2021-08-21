const express = require('express');
const app = express();

/*--------- Setting up morgan middleware ---------*/
app.use(morgan('dev'));

/*--------- Setting up cors middleware ---------*/
app.use(cors());

const db = require('./config/db');
const dbConnection = async () => {
  try {
  } catch (err) {}
};

/*--------- Setting up express body parser middleware ---------*/

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

module.exports = app;
