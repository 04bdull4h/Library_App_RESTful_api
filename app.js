const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

/*--------- Setting up app config ---------*/

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

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

/*--------- Setting up routes ---------*/

const bookRouter = require('./api/routes/bookRouter');
const authorRouter = require('./api/routes/authorRouter');
const userRouter = require('./api/routes/userRouter');

app.use('/api/v1/books', bookRouter);
app.use('/api/v1/authors', authorRouter);
app.use('/api/v1/users', userRouter);

/*--------- Exporting express app for the server ---------*/

module.exports = app;
