const bookValidationSchema = {
  title: { type: 'string', optional: false, min: 3, max: 100 },
  description: { type: 'string', optional: false, min: 30, max: 1000 },
  author: { type: 'string', optional: false, min: 1, max: 50 },
  isbn: { type: 'string', optional: false, min: 10, max: 13, unique: true },
  publisher: { type: 'string', optional: false, min: 1, max: 50 },
  price: { type: 'number', optional: false, positive: true },
  status: { type: 'boolean', optional: false },
};

module.exports = {
  bookValidationSchema,
};
