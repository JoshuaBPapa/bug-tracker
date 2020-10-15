const { Router } = require('express');

const paginationControllers = require('../controllers/pagination');
const userControllers = require('../controllers/user');
const authorisationMiddleware = require('../middleware/authorisation');
const validationMiddleware = require('../middleware/validation');

const router = Router();

// GET an individual user
router.get('/users/user/:userId', userControllers.getAUser);
// GET all users with pagination
router.get(
  '/users/:orderBy/:pageNumber',
  paginationControllers.calcPagination('users'),
  userControllers.getUsers
);
// GET users to assign to a ticket
router.get(
  '/users_to_assign',
  userControllers.getUsersToAssign
);

// POST a new user
router.post(
  '/users',
  validationMiddleware.validateCreateUser,
  userControllers.postCreateUser
);

// POST a new password
router.post(
  '/users/user/:editId/new_password',
  authorisationMiddleware.checkTargetIsMasterAdmin,
  validationMiddleware.validateNewUserPw,
  userControllers.postNewUserPw
);

// PUT a user
router.put(
  '/users/user/:editId',
  authorisationMiddleware.checkTargetIsMasterAdmin,
  validationMiddleware.validateUpdateUser,
  userControllers.putUpdateUser
);

// DELETE a user
router.delete(
  '/users/user/:userId',
  authorisationMiddleware.checkTargetIsMasterAdmin,
  userControllers.deleteUser
);

module.exports = router;