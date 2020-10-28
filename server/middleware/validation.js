const { body, validationResult } = require('express-validator');

const Team = require('../models/team');
const User = require('../models/user');

const checkPassword = [
  body('password')
    .isAlphanumeric()
    .withMessage('Please only use letters and numbers in your password')
    .isLength({ min: 8, max: 20 })
    .withMessage('The password length must be between 8 and 20 characters'),
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }

      return true;
    })
];

const checkUsername = body('username')
  .isAlphanumeric()
  .withMessage('Please only use letters and numbers in your username')
  .isLength({ min: 3, max: 25 })
  .withMessage('The username length must be between 3 and 25 characters')
  .custom((value, { req }) => {
    // db won't be checked for duplicate usernames when a new team is signing up
    // multiple teams may have the same usernames
    // the scope of preventing usernames being duplicated is within a team
    if (req.path.split('/')[1] === 'signup') {
      return true;
    }

    return User.findByUsername(value, req.teamId)
      .then(users => {
        if (users[0].length) {
          return Promise.reject('Username already in use');
        }

        return true;
      })
  });

const checkName = body('name')
  .trim()
  .isLength({ min: 3, max: 25 })
  .withMessage('The name length must be between 3 and 25 characters');

const checkJobTitle = body('jobTitle')
  .trim()
  .isLength({ min: 3, max: 25 })
  .withMessage('The job title must be between 3 and 25 characters');

const checkEmail = body('email')
  .isEmail()
  .withMessage('Please check if the entered email is valid')
  .normalizeEmail()
  .custom(value => {
    return User.findByEmail(value)
      .then(emails => {
        if (emails[0].length) {
          return Promise.reject('Email already in use');
        }

        return true;
      })
  });

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send({ validationErrors: errors.array() });
  }

  next();
};

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
  (req, res, next) => validationMiddleware(req, res, next)
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
  (req, res, next) => validationMiddleware(req, res, next)
];

exports.validateSignup = [
  body('teamName')
    .trim()
    .isLength({ min: 3, max: 25 })
    .withMessage('The team name length must be between 3 and 25 characters')
    .custom(value => {
      return Team.findByTeamName(value)
        .then(teamNames => {
          if (teamNames[0].length) {
            return Promise.reject('Team name already taken');
          }

          return true;
        });
    }),
  checkJobTitle,
  checkUsername,
  checkName,
  checkEmail,
  ...checkPassword,
  (req, res, next) => validationMiddleware(req, res, next)
];

exports.validateLogin = [
  body('teamName')
    .trim()
    .not().isEmpty()
    .withMessage('Please enter your team name'),
  body('username')
    .trim()
    .not().isEmpty()
    .withMessage('Please enter your username'),
  body('password')
    .trim()
    .not().isEmpty()
    .withMessage('Please enter your password'),
  (req, res, next) => validationMiddleware(req, res, next)
];

exports.validateCreateUser = [
  checkName,
  checkJobTitle,
  checkEmail,
  checkUsername,
  ...checkPassword,
  (req, res, next) => validationMiddleware(req, res, next)
];

exports.validateUpdateUser = [
  checkName,
  checkJobTitle,
  (req, res, next) => validationMiddleware(req, res, next)
];

exports.validateNewUserPw = [
  ...checkPassword,
  (req, res, next) => validationMiddleware(req, res, next)
];

exports.validateComment = [
  body('title')
    .trim()
    .not().isEmpty()
    .withMessage('Title can not be empty')
    .isLength({ max: 25 })
    .withMessage('Maximum of 25 characters allowed'),
  body('content')
    .trim()
    .isLength({ max: 500 })
    .withMessage('Maximum of 500 characters allowed'),
  (req, res, next) => validationMiddleware(req, res, next)
];