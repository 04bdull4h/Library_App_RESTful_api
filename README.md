# Library_App_RESTful_api

this is a RESTful api for library app developed using express js and MySQL for the database using sequelize ORM and its validations

### status: incomplete ❌

### .env.example

Before running the app you should fill these fields with your own credentials

```
PORT=
HOST=
NODE_ENV=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
DIALECT=
LOGGING=
```

```
$ npm i
$ npm run dev // for development env
$ npm start // for production env

```

## endpoints

```javascript
/**
 * @prefix api/v1/authors
 * @route authorRouter
 * @controller authorController
 * @public endpoints [fetchAllBooksByAuthorId, fetchAllAuthors, fetchAuthorById]
 * @private endpoints [createAuthor]
 */

router.post('/', checkTokenAuth, authorController.createAuthor);
router.get('/:id/books', authorController.fetchAllBooksByAuthorId);
router.get('/', authorController.fetchAllAuthors);
router.get('/:id', authorController.fetchAuthorById);
```

```javascript
/**
 * @prefix api/v1/books
 * @route bookRouter
 * @controller bookController
 * @public endpoints [fetchAllBooks, fetchBookById]
 * @private endpoints [createBook, updateBookById, deleteBookById]
 */

router.post('/', checkTokenAuth, bookController.createBook);
router.get('/', bookController.fetchAllBooks);
router.get('/:id', bookController.fetchBookById);
router.put('/:id', checkTokenAuth, bookController.updateBookById);
router.delete('/:id', checkTokenAuth, bookController.deleteBookById);
```

```javascript
/**
 * @prefix api/v1/users
 * @route userController
 * @controller userController
 */

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', userController.fetchAllUsers);
router.get('/:id', userController.fetchUserById);
```
