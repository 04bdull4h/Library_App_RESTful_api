const { check } = require('express-validator');

const bodyValidatorMiddleware = (method) => {
  switch (method) {
    case 'createBook': {
      return [
        check('title')
          .exists()
          .withMessage('title is required')
          .isString()
          .withMessage('title must be a string'),
        check('description')
          .exists()
          .withMessage('description is required')
          .isString()
          .withMessage('description must be a string'),
        check('author')
          .exists()
          .withMessage('author is required')
          .isString()
          .withMessage('author must be a string'),
        check('isbn', 'ISBN is required')
          .exists()
          .withMessage('ISBN is required')
          .isString()
          .withMessage('ISBN must be with type string')
          .isLength({ min: 10, max: 13 })
          .withMessage('ISBN should be between 10 to 13 characters long'),
        check('price')
          .exists()
          .withMessage('price is required')
          .isFloat()
          .withMessage('price must be a float'),
        check('status')
          .exists()
          .withMessage('status is required')
          .isBoolean()
          .withMessage('status must be a boolean'),
        check('AuthorId', 'AuthorId is required')
          .exists()
          .withMessage('AuthorId is required')
          .isUUID()
          .withMessage('AuthorId must be a UUID'),
      ];
    }
  }
};

module.exports = bodyValidatorMiddleware;
