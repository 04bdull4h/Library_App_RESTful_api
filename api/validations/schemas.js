const createBookValidationSchema = {
  title: { type: 'string', optional: false, min: 3, max: 100 },
  description: { type: 'string', optional: false, min: 30, max: 1000 },
  author: { type: 'string', optional: false, min: 1, max: 50 },
  isbn: { type: 'string', optional: false, min: 10, max: 13 },
  publisher: { type: 'string', optional: false, min: 1, max: 50 },
  price: { type: 'number', optional: false, positive: true },
};

const updateBookValidationSchema = {
  title: { type: 'string', optional: true, min: 3, max: 100 },
  description: { type: 'string', optional: true, min: 30, max: 1000 },
  author: { type: 'string', optional: true, min: 1, max: 50 },
  isbn: { type: 'string', optional: true, min: 10, max: 13 },
  publisher: { type: 'string', optional: true, min: 1, max: 50 },
  price: { type: 'number', optional: true, positive: true },
};

module.exports = {
  createBookValidationSchema,
  updateBookValidationSchema,
};
