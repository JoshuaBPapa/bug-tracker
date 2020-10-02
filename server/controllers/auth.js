const bcrypt = require('bcryptjs');

const Team = require('../models/team');
const User = require('../models/user');
const { AccessToken, RefreshToken } = require('../models/token');

exports.signUp = (req, res, next) => {
  let teamId, userId, accessToken, refreshToken;

  const newTeam = new Team(
    req.body.teamName
  );

  newTeam.create()
    .then(team => {
      teamId = team[0].insertId;
      return bcrypt.hash(req.body.password, 12);
    })
    .then(hashedPw => {
      const newUser = new User(
        req.body.email,
        req.body.username,
        hashedPw,
        req.body.name,
        req.body.jobTitle,
        4, // create the first user in a team with auth level 4 = master admin
        teamId
      );

      return newUser.create();
    })
    // automatically login signed up users
    .then(user => {
      userId = user[0].insertId;

      const tokenPayload = [
        userId,
        4,
        teamId
      ];

      accessToken = new AccessToken(...tokenPayload);
      refreshToken = new RefreshToken(...tokenPayload);

      // add the refresh token to the db
      return refreshToken.insertToken();
    })
    .then(() => {
      return res.set({
        'x-access-token': accessToken.encoded,
        'x-refresh-token': refreshToken.encoded,
        'x-userid': userId
      })
        .status(201)
        .send('Sign in successful.');
    })
    .catch(err => {
      next(err);
    });
};

exports.login = (req, res, next) => {
  let teamId, user, accessToken, refreshToken;
  const credentialError = new Error;
  credentialError.message = 'Invalid credentials. Please check if the entered team name, username, and password are correct.';
  credentialError.statusCode = 401;

  Team.findByTeamName(req.body.teamName)
    .then(team => {
      if (!team[0].length) {
        throw credentialError;
      }

      teamId = team[0][0].id;

      return User.findByUsername(req.body.username, teamId);
    })
    .then(dbUser => {
      if (!dbUser[0].length) {
        throw credentialError;
      }

      user = dbUser[0][0];

      return bcrypt.compare(req.body.password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        throw credentialError;
      }

      // delete the user's previous refresh token on successful login
      return RefreshToken.deleteToken(user.id);
    })
    .then(() => {
      // create an access token and a new refresh token for the user
      const tokenPayload = [
        user.id,
        user.authLevel,
        teamId
      ];

      accessToken = new AccessToken(...tokenPayload);
      refreshToken = new RefreshToken(...tokenPayload);

      // add the refresh token to the db
      return refreshToken.insertToken();
    })
    .then(() => {
      return res.set({
        'x-access-token': accessToken.encoded,
        'x-refresh-token': refreshToken.encoded,
        'x-userid': user.id
      })
        .status(201)
        .send('Login successful.');
    })
    .catch(err => {
      next(err);
    });
};

exports.logout = (req, res, next) => {
  RefreshToken.deleteToken(req.userId)
    .then(() => {
      res.status(200).send('Logout successful');
    })
    .catch(err => {
      next(err);
    });
};