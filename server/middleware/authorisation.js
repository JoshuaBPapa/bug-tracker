const Ticket = require('../models/ticket');
const User = require('../models/user');

// --- AUTH LEVELS --- //
// level 1 = user
// level 2 = project manager
// level 3 = admin
// level 4 = master admin

const authLevelError = new Error;
authLevelError.message = 'You are not authorised to perform this action.';
authLevelError.statusCode = 403;

exports.checkAuthLevel = (req, res, next) => {
  const { userAuthLevel, method } = req;
  const route = req.path.split('/')[1];

  // permissions for a level 1 user
  if (userAuthLevel === 1) {
    // level 1 users are only allowed to access tickets routes and their own user information
    if (route === 'tickets' || req.path === `/users/user/${req.userId}`) {
    } else {
      throw authLevelError;
    }
  }

  // permissions for a level 2 user
  if (userAuthLevel === 2) {
    // can access all, but limited to only GET methods for user routes
    if (route === 'users' && method !== 'GET') {
      throw authLevelError;
    }
  }

  // permissions for all users under level 4
  if (userAuthLevel < 4) {
    // only level 4 users can access the team routes
    if (route === 'teams') {
      throw authLevelError;
    }
  }

  next();
};

exports.checkTicketAuthorisation = requiredAuthLevel => {
  return (req, res, next) => {
    const { userAuthLevel } = req;
    
    // user doesn't have a high enough authorisation level
    if (userAuthLevel < requiredAuthLevel) {
      throw authLevelError;
    }

    if (userAuthLevel === 1) {
      // level 1 users can only GET and PUT tickets
      // they can not assign users to tickets though
      if (req.method === 'POST' || req.method === 'DELETE') {
        throw authLevelError;
      }

      // level 1 users can only GET the tickets assigned to them
      if (
        req.path.includes('/tickets/user/assigned') &&
        Number(req.params.userId) !== req.userId
      ) {
        throw authLevelError;
      }

      // level 1 users can only GET the column count of tickets assigned to them
      if (
        req.path.includes('/tickets/column_count/user_tickets') &&
        Number(req.params.parentId) !== req.userId
        ) {
        throw authLevelError;
      }
      
      // level 1 users need to be allocated to a ticket to access it
      if (req.params.ticketId) {
      Ticket.findUsersAssignedToTicket(req.params.ticketId, req.teamId)
        .then(users => {
          if (!users[0].find(user => user.id === req.userId)) {
            throw authLevelError;
          }
        })
        .catch(err => {
          next(err);
        });
      }
    }

    next();
  }
};

// only level 4 users can update the master admin in users routes
exports.checkTargetIsMasterAdmin = (req, res, next) => {
  const { params, userAuthLevel } = req;
  const targetUserId = params.userId ? params.userId : params.editId;

  User.findById(targetUserId, req.teamId)
    .then(user => {
      if (user[0][0].authLevel === 4) {
        // users under level 4 can not access the master admin
        if (userAuthLevel < 4) {
          throw authLevelError;
        }

        // prevent the master admin from deleting their account
        if (method === 'DELETE') {
          const error = new Error;
          error.message = 'The master admin can not delete their account.';
          error.statusCode = 403;
          throw error;
        }

        // prevent the master admin from reducing their authorisation level
        if (method === 'PUT') {
          if (Number(targetUserId) === req.userId && Number(req.body.authLevel) < 4) {
            const error = new Error;
            error.message = 'The master admin can not reduce their authorisation level.';
            error.statusCode = 403;
            throw error;
          }
        }
      }

    })
    .catch(err => {
      next(err);
    });

  next();
};

