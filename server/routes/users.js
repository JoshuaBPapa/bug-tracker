const { Router } = require('express');

const paginationControllers = require('../controllers/pagination');
const userControllers = require('../controllers/user');
const validation = require('../middleware/validation');

const router = Router();

// GET an individual user
router.get('/users/user/:id', userControllers.getAUser);
// GET all users
router.get(
  '/users/:orderBy/:pageNumber',
  paginationControllers.calcPagination('users'),
  userControllers.getUsers
);

// POST a new user
router.post(
  '/users',
  validation.validateCreateUser,
  userControllers.postCreateUser
);

// POST a new password
router.post(
  '/users/user/:editId/new_password',
  validation.validateNewUserPw,
  userControllers.postNewUserPw
);

// PUT a user
router.put(
  '/users/user/:editId',
  validation.validateUpdateUser,
  userControllers.putUpdateUser
);

module.exports = router;