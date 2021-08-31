const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
require('colors');
const hpp = require('hpp');
const errorHandlerMiddleware = require('./api/middlewares/errorHandlerMiddleware');
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

/*--------- Setting MySQL connection ---------*/
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

/*--------- Setting up morgan middleware ---------*/
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

/*--------- Setting up cors middleware  ---------*/
app.use(cors());

/*--------- Setting up hpp middleware---------*/
app.use(hpp());

/*--------- Setting up helmet middlewares ---------*/
app.use(helmet());

/*--------- Requiring routes ---------*/
const bookRouter = require('./api/routes/bookRouter');
const authorRouter = require('./api/routes/authorRouter');
const userRouter = require('./api/routes/userRouter');
const publisherRouter = require('./api/routes/publisherRouter');
const borrowerRouter = require('./api/routes/borrowerRouter');
const borrowedBookRouter = require('./api/routes/borrowedBookRouter');
const stuffRouter = require('./api/routes/employeeRouter');
const employeeRouter = require('./api/routes/employeeRouter');
const departmentRouter = require('./api/routes/departmentRouter');

/*--------- Setting up routes ---------*/
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/authors', authorRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/publishers', publisherRouter);
app.use('/api/v1/borrowers', borrowerRouter);
app.use('/api/v1/borrowed-books', borrowedBookRouter);
app.use('/api/v1/stuff');
app.use('/api/v1/employees', employeeRouter);
app.use('/api/v1/departments', departmentRouter);

/*--------- Setting up error handler middleware ---------*/
app.use(errorHandlerMiddleware);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
});

/*--------- Exporting express app for the server ---------*/
module.exports = app;
