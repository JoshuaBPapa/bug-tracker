const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { RefreshToken } = require('../models/token');

exports.getUsers = (req, res, next) => {
  const orderBy = req.params.orderBy.replace("-", " ");

  User.findAll(orderBy, req.pageNumber, req.teamId)
    .then(users => {
      if (!users[0].length) {
        const error = new Error;
        error.message = 'No users found.';
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({
        results: users[0],
        totalPages: req.totalPageCount,
        totalResults: req.totalRows
      });
    })
    .catch(err => {
      next(err);
    });
};

exports.getAUser = (req, res, next) => {
  User.findById(req.params.userId, req.teamId)
    .then(user => {
      if (!user[0].length) {
        const error = new Error;
        error.message = 'User not found.';
        error.statusCode = 404;
        throw error;
      }

      res.status(200).send(user[0][0]);
    })
    .catch(err => {
      next(err);
    });
};

exports.getUsersToAssign = (req, res, next) => {
  User.findUsersToAssign(req.teamId)
    .then(users => {
      res.status(200).send(users[0]);
    })
    .catch(err => {
      next(err);
    });
};

exports.postCreateUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 12)
    .then(hashedPw => {
      const newUser = new User(
        req.body.email,
        req.body.username,
        hashedPw,
        req.body.name,
        req.body.jobTitle,
        req.body.authLevel,
        req.teamId
      );

      return newUser.create()
    })
    .then(user => {
      res.status(201).send({ id: user[0].insertId });
    })
    .catch(err => {
      next(err);
    });
};

exports.putUpdateUser = (req, res, next) => {
  const { editId } = req.params;

  User.update(
    editId,
    req.body.name,
    req.body.jobTitle,
    req.body.authLevel,
    req.teamId
  )
    .then(() => {
      res.status(200).send({ id: editId });
    })
    .catch(err => {
      next(err);
    });
};

exports.postNewUserPw = (req, res, next) => {
  const { editId } = req.params;

  bcrypt.hash(req.body.password, 12)
    .then(newPassword => {
      return User.updatePw(editId, newPassword, req.teamId);
    })
    .then(() => {
      return RefreshToken.deleteToken(editId);
    })
    .then(() => {
      res.status(200).send({ id: editId });
    })
    .catch(err => {
      next(err);
    });
};

exports.deleteUser = (req, res, next) => {
  User.deleteUser(req.params.userId, req.teamId)
    .then(() => {
      res.status(200).send('User successfully deleted.');
    })
    .catch(err => {
      next(err);
    });
};