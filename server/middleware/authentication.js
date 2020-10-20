const jwt = require('jsonwebtoken');

const { AccessToken, RefreshToken } = require('../models/token');

exports.checkUserToken = (req, res, next) => {
  const accessToken = req.get('x-access-token');
  const refreshToken = req.get('x-refresh-token');
  const userId = req.get('x-userid');

  if (!userId) {
    const error = new Error;
    error.message = 'No user id provided with active and refresh tokens.';
    error.statusCode = 403;
    throw error;
  }

  if (!accessToken) {
    const error = new Error;
    error.message = 'No access token provided.';
    error.statusCode = 403;
    throw error;
  }

  if (!refreshToken) {
    const error = new Error;
    error.message = 'No refresh token provided.';
    error.statusCode = 403;
    throw error;
  }

  jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
    // access token is still valid
    if (!err) {
      req.userId = decoded.userId;
      req.userAuthLevel = decoded.userAuthLevel;
      req.teamId = decoded.teamId;

      res.set({
        'x-access-token': accessToken,
        'x-refresh-token': refreshToken,
        'x-userid': userId,
        'x-authorisation-level': decoded.userAuthLevel
      });

      next();
      // access token is unauthorised
    } else if (err && !err.message === 'jwt expired') {
      const error = new Error;
      error.message = 'Unauthorised token.';
      error.statusCode = 403;
      throw error;
      // check if the access token is expired and get the user's refresh token if so
    } else if (err.message === 'jwt expired') {
      RefreshToken.findTokenByUserId(userId)
        // check if the user has a refresh token
        .then(dbToken => {
          if (!dbToken[0].length) {
            const error = new Error;
            error.message = 'Cannot find a refresh token for this user.';
            error.statusCode = 403;
            throw error;
          }

          // check if the db refresh token matches the refresh token in the request head
          if (dbToken[0][0].token !== refreshToken) {
            const error = new Error;
            error.message = 'Unauthorised token.';
            error.statusCode = 403;
            throw error;
          }

          // check if the refresh token is still valid and create a new access token if so 
          jwt.verify(dbToken[0][0].token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
              const error = new Error;
              error.message = 'Expired or unauthorised refresh token.';
              error.statusCode = 403;
              throw error;
            }

            const newAccessToken = new AccessToken(
              decoded.userId,
              decoded.userAuthLevel,
              decoded.teamId
            );

            res.set({
              'x-access-token': newAccessToken.encoded,
              'x-refresh-token': refreshToken,
              'x-userid': decoded.userId,
              'x-authorisation-level': decoded.userAuthLevel
            });

            req.userId = decoded.userId;
            req.userAuthLevel = decoded.userAuthLevel;
            req.teamId = decoded.teamId;

            next();
          });
        })
        .catch(err => {
          next(err);
        });
    }
  });
};