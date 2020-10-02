const { Router } = require('express');

const authControllers = require('../controllers/auth');
const validation = require('../middleware/validation');
const auth = require('../middleware/auth');

const router = Router();

// POST sign up
router.post(
  '/signup', 
  validation.validateSignup,
  authControllers.signUp
);
// POST login
router.post(
  '/login',
  validation.validateLogin,
  authControllers.login
);
// POST logout
router.post(
  '/logout',
  auth.checkUserToken,
  authControllers.logout
);

module.exports = router;