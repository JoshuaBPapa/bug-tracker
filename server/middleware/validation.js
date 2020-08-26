const { body, validationResult } = require('express-validator');

exports.validateProject = [
  body('title')
    .trim()
    .not().isEmpty()
    .withMessage('Title can not be empty')
    .isLength({ max: 25 })
    .withMessage('Maximum of 25 characters allowed'),
  body('description')
    .trim()
    .isLength({ max: 250 })
    .withMessage('Maximum of 250 characters allowed'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ validationErrors: errors.array() });
    };
    next();
  }
];

exports.validateTicket = [
  body('title')
    .trim()
    .not().isEmpty()
    .withMessage('Title can not be empty')
    .isLength({ max: 45 })
    .withMessage('Maximum of 45 characters allowed'),
  body('description')
    .trim()
    .isLength({ max: 500 })
    .withMessage('Maximum of 500 characters allowed'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ validationErrors: errors.array() });
    };
    next();
  }
];