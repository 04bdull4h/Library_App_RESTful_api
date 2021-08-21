# Library_App_RESTful_api

this is a RESTful api for library app developed using express js and MySQL for the database using sequelize ORM and its validations

### status: incomplete ❌

### npm packages

```
1. express
2. dotenv
3. colors
4. morgan
5. mysql2
6. sequelize
7. nodemon
```

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
 */

router.post('/', authorController.createAuthor);
router.get('/:id/books', authorController.fetchAllBooksByAuthorId);
router.get('/', authorController.fetchAllAuthors);
router.get('/:id', authorController.fetchAuthorById);
```

```javascript
/**
 * @prefix api/v1/books
 * @route bookRouter
 * @controller bookController
 */

router.post('/', bookController.createBook);
router.get('/', bookController.fetchAllBooks);
router.get('/:id', bookController.fetchBookById);
router.put('/:id', bookController.updateBookById);
router.delete('/:id', bookController.deleteBookById);
```
