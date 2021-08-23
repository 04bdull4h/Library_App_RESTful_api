# Library_App_RESTful_api

this is a RESTful api for library app developed using express js and MySQL for the database using sequelize ORM and its validations.
it contains JWT to secure some endpoints with access token, and centralized error handler as a middleware.

## status: incomplete ❌

## .env.example

Before running the app you should fill these fields with your own credentials:

```
PORT=
HOST=
NODE_ENV=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
DIALECT=
JWT_KEY=
```

## How to use

You should have NodeJS & MySQL server, (e.g, XAMPP or Wampserver) installed in your OS

```
$ npm i
$ npm run dev // for development env
$ npm start // for production env
```

## Endpoints

| Method                      | Endpoint                  |
| --------------------------- | ------------------------- |
| GET fetchAllBooksByAuthorId | /api/v1/authors/:id/books |
| GET fetchAllAuthors         | /api/v1/authors           |
| GET fetchAuthorById         | /api/v1/authors/:id       |
| PUT updateAuthorById        | /api/v1/authors/:id       |
| DELETE deleteAuthorById     | /api/v1/authors:/id       |
| POST createBook             | /api/v1/books             |
| GET fetchAllBooks           | /api/v1/books             |
| GET fetchBookById           | /api/v1/books/:id         |
| PUT updateBookById          | /api/v1/books/:id         |
| DELETE deleteBookById       | /api/v1/books:/id         |
| POST register               | /api/v1/users/register    |
| POST login                  | /api/v1/user/login        |
| GET fetchAllUsers           | /api/v1/users/            |
| GET fetchUserById           | /api/v1/users/:id         |
| DELETE deleteUserById       | /api/v1/users/:id         |
| PUT updateUserById          | /api/v1/users/:id         |

## Routes

```javascript
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
router.get('/', bookController.fetchAllBooks);
router.get('/:id', bookController.fetchBookById);
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
```
