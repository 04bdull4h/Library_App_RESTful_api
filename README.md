# Library_app_RESTful_api

this is a RESTful api for library app developed using express js and MySQL for the database using sequelize ORM. it contains JWT to secure some endpoints with access token, and centralized error handler as a middleware. It uses express-validator to validate body request. This project is scalable I have tried to use best architecture, e.g., separation routes from controllers and models in an independent files.

## status: incomplete ❌

## Built with

1. Express.js - Minimalist backend framework
2. Node.js - JavaScript runtime
3. Sequelize - Promise-based Node.js ORM for MySQL database

## .env.example

Before running the app you should fill these fields with your own credentials:

```
PORT=
HOST=
NODE_ENV=
DB_HOST=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
DIALECT=
LOGGING=
JWT_KEY=
```

## How to use

You should have NodeJS & MySQL server, (e.g, XAMPP or WampServer) installed in your OS

```
$ npm i
$ npm run dev // for development env
$ npm start // for production env
```

## Endpoints

All endpoints tested by postman, you can use it or insomnia both are ok.

| Method                         | Endpoint                     |
| ------------------------------ | ---------------------------- |
| GET fetchAllBooksByAuthorId    | /api/v1/authors/:id/books    |
| GET fetchAllAuthors            | /api/v1/authors              |
| GET fetchAuthorById            | /api/v1/authors/:id          |
| PUT updateAuthorById           | /api/v1/authors/:id          |
| DELETE deleteAuthorById        | /api/v1/authors:/id          |
| POST createBook                | /api/v1/books                |
| POST addBookToPublisher        | /api/v1/books/add-publisher  |
| GET fetchAllBooks              | /api/v1/books                |
| GET fetchBookById              | /api/v1/books/:id            |
| GET fetchAllPublishersByBookId | /api/v1/books/:id/publishers |
| PUT updateBookById             | /api/v1/books/:id            |
| DELETE deleteBookById          | /api/v1/books:/id            |
| POST register                  | /api/v1/users/register       |
| POST login                     | /api/v1/user/login           |
| GET fetchAllUsers              | /api/v1/users/               |
| GET fetchUserById              | /api/v1/users/:id            |
| DELETE deleteUserById          | /api/v1/users/:id            |
| PUT updateUserById             | /api/v1/users/:id            |
| POST createAuthor              | /api/v1/publisher/           |
| POST createPublisher           | /api/v1/publisher/           |
| POST addPublisherToBook        | /api/v1/publisher/add-book   |
| GET fetchAllBooksByAuthorId    | /api/v1/publisher/:id        |
| GET fetchAllAuthors            | /api/v1/publisher/           |
| GET fetchUserById              | /api/v1/publisher/:id        |
| DELETE deleteAuthorById        | /api/v1/publisher/:id        |
| PUT updateAuthorById           | /api/v1/publisher/:id        |

## Routes

```js
/**
 * @prefix api/v1/authors
 * @route authorRouter
 * @controller authorController
 * @public endpoints [fetchAllBooksByAuthorId, fetchAllAuthors, fetchAuthorById]
 * @private endpoints [createAuthor, updateAuthorById, deleteAuthorById]
 */

router.post(
  '/',
  accessTokenMiddleware,
  bodyValidatorMiddleware('createAuthor'),
  authorController.createAuthor
);
router.get('/:id/books', authorController.fetchAllBooksByAuthorId);
router.get('/', authorController.fetchAllAuthors);
router.get('/:id', authorController.fetchAuthorById);
router.put('/:id', accessTokenMiddleware, authorController.updateAuthorById);
router.delete('/:id', accessTokenMiddleware, authorController.deleteAuthorById);

/**
 * @prefix api/v1/books
 * @route bookRouter
 * @controller bookController
 * @public endpoints [fetchAllBooks, fetchBookById]
 * @private endpoints [createBook, updateBookById, deleteBookById]
 */

router.post(
  '/',
  accessTokenMiddleware,
  bodyValidatorMiddleware('createBook'),
  bookController.createBook
);
router.post(
  '/add-author',
  accessTokenMiddleware,
  bookController.addBookToPublisher
);
router.get('/', bookController.fetchAllBooks);
router.get('/:id', bookController.fetchBookById);
router.get('/:id/publishers', bookController.fetchAllPublishersByBookId);
router.put(
  '/:id',
  accessTokenMiddleware,
  bodyValidatorMiddleware('updateBookById'),
  bookController.updateBookById
);
router.delete('/:id', accessTokenMiddleware, bookController.deleteBookById);

/**
 * @prefix api/v1/users
 * @route userController
 * @controller userController
 * @public endpoints [register, login, fetchAllUsers, fetchUserById]
 * @private endpoints [deleteUserById, updateUserById]
 */

router.post(
  '/register',
  bodyValidatorMiddleware('register'),
  userController.register
);
router.post('/login', bodyValidatorMiddleware('login'), userController.login);
router.get('/', userController.fetchAllUsers);
router.get('/:id', userController.fetchUserById);
router.delete('/:id', accessTokenMiddleware, userController.deleteUserById);
router.put(
  '/:id',
  accessTokenMiddleware,
  bodyValidatorMiddleware('updateUserById'),
  userController.updateUserById
);

/**
 * @prefix api/v1/publisher
 * @route publisherController
 * @controller publisherController
 * @public endpoints [createPublisher, fetchAllPublishers, fetchAllBooksByPublisherId, fetchPublisherById]
 * @private endpoints [addPublisherToBook, updatePublisherById, deletePublisherById]
 */

router.post(
  '/',
  bodyValidatorMiddleware('createPublisher'),
  publisherController.createPublisher
);
router.post(
  '/add-book',
  accessTokenMiddleware,
  publisherController.addPublisherToBook
);
router.get('/', publisherController.fetchAllPublishers);
router.get('/:id', publisherController.fetchPublisherById);
router.get('/:id/books', publisherController.fetchAllBooksByPublisherId);
router.put(
  '/:id',
  accessTokenMiddleware,
  bodyValidatorMiddleware('updatePublisherById'),
  publisherController.updatePublisherById
);
router.delete(
  '/:id',
  accessTokenMiddleware,
  publisherController.deletePublisherById
);
```
