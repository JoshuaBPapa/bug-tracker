const { Router } = require('express');

const authenticationControllers = require('../controllers/authentication');
const validationMiddleware = require('../middleware/validation');
const authenticationMiddleware = require('../middleware/authentication');

const router = Router();

// POST sign up
router.post(
  '/signup', 
  validationMiddleware.validateSignup,
  authenticationControllers.signUp
);
// POST login
router.post(
  '/login',
  validationMiddleware.validateLogin,
  authenticationControllers.login
);
// POST logout
router.post(
  '/logout',
  authenticationMiddleware.checkUserToken,
  authenticationControllers.logout
);

module.exports = router;