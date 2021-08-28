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
          .isISBN()
          .withMessage('please provide a valid ISBN'),
        check('publisher')
          .exists()
          .isString()
          .withMessage('publisher must be a string'),
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
        check('AuthorId')
          .exists()
          .withMessage('AuthorId is required')
          .isUUID()
          .withMessage('AuthorId must be a UUID'),
      ];
    }
    case 'updateBookById': {
      return [
        check('title')
          .optional()
          .isString()
          .withMessage('title must be a string'),
        check('description')
          .optional()
          .isString()
          .withMessage('description must be a string'),
        check('author')
          .optional()
          .isString()
          .withMessage('author must be a string'),
        check('isbn', 'ISBN is required')
          .optional()
          .isString()
          .withMessage('ISBN must be with type string')
          .isLength({ min: 10, max: 13 })
          .withMessage('ISBN should be between 10 to 13 characters long'),
        check('publisher')
          .optional()
          .isString()
          .withMessage('publisher must be a string'),
        check('price')
          .optional()
          .isFloat()
          .withMessage('price must be a float'),
        check('status')
          .optional()
          .isBoolean()
          .withMessage('status must be a boolean'),
        check('AuthorId')
          .optional()
          .isUUID()
          .withMessage('AuthorId must be a UUID'),
      ];
    }
    case 'createAuthor': {
      return [
        check('firstName')
          .exists()
          .withMessage('first name is required')
          .isString()
          .withMessage('first name must be a string'),
        check('lastName')
          .exists()
          .withMessage('last name is required')
          .isString()
          .withMessage('last name must be a string'),
        check('email')
          .exists()
          .withMessage('email is required')
          .isEmail()
          .withMessage('please provide valid email')
          .isString()
          .withMessage('email must be a string'),
        check('phoneNumber')
          .exists()
          .withMessage('phone number is required')
          .isString()
          .withMessage('phone number must be a string'),
      ];
    }
    case 'register': {
      return [
        check('firstName')
          .exists()
          .withMessage('first name is required')
          .isString()
          .withMessage('first name must be a string'),
        check('lastName')
          .exists()
          .withMessage('last name is required')
          .isString()
          .withMessage('last name must be a string'),
        check('username')
          .exists()
          .withMessage('username is required')
          .isString()
          .withMessage('username must be a string')
          .isLength({ min: 4, max: 16 })
          .isAlphanumeric()
          .withMessage('Username must contains only letters and numbers'),
        check('email')
          .exists()
          .withMessage('email is required')
          .isString()
          .withMessage('email must be a string'),
        check('password')
          .exists()
          .withMessage('password is required')
          .isLength({ min: 6, max: 1024 })
          .withMessage(
            'Password length should be between 6 and 1024 characters long'
          )
          .matches(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{6,}/
          )
          .withMessage(
            `Password must contain a minimum of 1 lower case letter [a-z], a minimum of 1 upper case letter [A-Z], a minimum of 1 numeric character [0-9], and a minimum of 1 special character: ~\`!@#$%^&*()-_+={}[]|\;:\"<>,./?`
          ),
      ];
    }
    case 'login': {
      return [
        check('email')
          .exists()
          .withMessage('email is required')
          .isString()
          .withMessage('email must be a string')
          .isEmail()
          .withMessage('Please provide a valid email'),
        check('password').exists().withMessage('password is required'),
      ];
    }
    case 'updateUserById': {
      return [
        check('firstName')
          .optional()
          .isString()
          .withMessage('first name must be a string'),
        check('lastName')
          .optional()
          .isString()
          .withMessage('last name must be a string'),
        check('username')
          .optional()
          .isString()
          .withMessage('username must be a string')
          .isLength({ min: 4, max: 16 })
          .isAlphanumeric()
          .withMessage('Username must contains only letters and numbers'),
        check('email')
          .optional()
          .isString()
          .withMessage('email must be a string'),
        check('password')
          .optional()
          .isLength({ min: 6, max: 1024 })
          .withMessage(
            'Password length should be between 6 and 1024 characters long'
          )
          .matches(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{6,}/
          )
          .withMessage(
            `Password must contain a minimum of 1 lower case letter [a-z], a minimum of 1 upper case letter [A-Z], a minimum of 1 numeric character [0-9], and a minimum of 1 special character: ~\`!@#$%^&*()-_+={}[]|\;:\"<>,./?`
          ),
      ];
    }
    case 'createPublisher': {
      return [
        check('name')
          .exists()
          .withMessage('name is required')
          .isString()
          .withMessage('name must be a string'),
        check('address')
          .exists()
          .withMessage('address is required')
          .isString()
          .withMessage('address must be a string'),
        check('city')
          .exists()
          .withMessage('city is required')
          .isString()
          .withMessage('city must be a string'),
        check('country')
          .exists()
          .withMessage('country is required')
          .isString()
          .withMessage('country must be a string'),
        check('specialization')
          .exists()
          .withMessage('specialization is required')
          .isString()
          .withMessage('specialization must be a string'),
        check('phoneNumber')
          .exists()
          .withMessage('phone number is required')
          .isString()
          .withMessage('phone number must be a string'),
        check('email')
          .exists()
          .withMessage('email is required')
          .isString()
          .withMessage('email must be string')
          .isEmail()
          .withMessage('please provide a valid email'),
      ];
    }
    case 'updatePublisherById': {
      return [
        check('name')
          .optional()
          .isString()
          .withMessage('name must be a string'),
        check('address')
          .optional()
          .isString()
          .withMessage('address must be a string'),
        check('city')
          .optional()
          .isString()
          .withMessage('city must be a string'),
        check('country')
          .optional()
          .isString()
          .withMessage('country must be a string'),
        check('specialization')
          .optional()
          .isString()
          .withMessage('specialization must be a string'),
        check('phoneNumber')
          .optional()
          .isString()
          .withMessage('phone number must be a string'),
        check('email')
          .optional()
          .isString()
          .withMessage('email must be string')
          .isEmail()
          .withMessage('please provide a valid email'),
      ];
    }
    case 'createBorrower': {
      return [
        check('firstName')
          .exists()
          .withMessage('first name is required')
          .isString()
          .withMessage('first name must be a string'),
        check('lastName')
          .exists()
          .withMessage('last name is required')
          .isString()
          .withMessage('last name must be a string'),
        check('email')
          .exists()
          .withMessage('email is required')
          .isString()
          .withMessage('email must be a string')
          .isEmail()
          .withMessage('please provide a valid E-mail'),
        check('phoneNumber')
          .exists()
          .withMessage('phone number is required')
          .isString()
          .withMessage('phone number must be a string'),
      ];
    }
    case 'createBorrowedBook': {
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
        check('isbn')
          .exists()
          .withMessage('isbn is required')
          .isISBN()
          .withMessage('please provide a valid ISBN'),
        check('publisher')
          .exists()
          .withMessage('publisher is required')
          .isString()
          .withMessage('publisher must be a string'),
        check('status')
          .exists()
          .withMessage('status is required')
          .isBoolean()
          .withMessage('status must be a boolean'),
        check('issueDate')
          .exists()
          .withMessage('issue date is required')
          .isDate()
          .withMessage('please provide a valid issue date YY/MM/DD'),
        check('dueDate')
          .exists()
          .withMessage('due date is required')
          .isDate()
          .withMessage('please provide a valid due date YY/MM/DD'),
        check('BorrowerId')
          .exists()
          .withMessage('Borrower id is required')
          .isUUID()
          .withMessage('please provide a valid UUID borrower id'),
      ];
    }
    case 'updateBorrowedBook': {
      return [
        check('title')
          .optional()
          .isString()
          .withMessage('title must be a string'),
        check('description')
          .optional()
          .isString()
          .withMessage('description must be a string'),
        check('author')
          .optional()
          .isString()
          .withMessage('author must be a string'),
        check('isbn')
          .optional()
          .isISBN()
          .withMessage('please provide a valid ISBN'),
        check('publisher')
          .optional()
          .isString()
          .withMessage('publisher must be a string'),
        check('status')
          .optional()
          .isBoolean()
          .withMessage('status must be a boolean'),
        check('issueDate')
          .optional()
          .isDate()
          .withMessage('please provide a valid issue date YY/MM/DD'),
        check('dueDate')
          .optional()
          .isDate()
          .withMessage('please provide a valid due date YY/MM/DD'),
        check('BorrowerId')
          .optional()
          .isUUID()
          .withMessage('please provide a valid UUID borrower id'),
      ];
    }
  }
};

module.exports = bodyValidatorMiddleware;
