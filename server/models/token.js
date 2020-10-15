const db = require('../database/database');
const jwt = require('jsonwebtoken');

const createJwt = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn });
};

class Token {
  constructor(userId, userAuthLevel, teamId) {
    this.userId = userId;
    this.userAuthLevel = userAuthLevel;
    this.teamId = teamId;
  };
};

class AccessToken extends Token {
  constructor(userId, userAuthLevel, teamId) {
    super(userId, userAuthLevel, teamId);
    this.encoded = createJwt(
      {
        userId: userId,
        userAuthLevel: userAuthLevel, 
        teamId: teamId 
      },
      '15m'
    );
  };
}

class RefreshToken extends Token {
  constructor(userId, userAuthLevel, teamId) {
    super(userId, userAuthLevel, teamId);
    this.encoded = createJwt(
      {
        userId: userId,
        userAuthLevel: userAuthLevel, 
        teamId: teamId 
      },
      '30d'
    );
  };

  insertToken() {
    return db.execute(
      'INSERT INTO tokens (token, userId, teamId) VALUES (?, ?, ?)',
      [this.encoded, this.userId, this.teamId]
    );
  };

  static findTokenByUserId(userId) {
    return db.execute(
      `SELECT
        tokens.token
      FROM
        tokens
      WHERE
        tokens.userId = ${userId}`
    );
  };

  static deleteToken(userId) {
    return db.execute(
      `DELETE FROM
        tokens
      WHERE
        tokens.userId = ${userId}`
    );
  };
};

module.exports = {
  AccessToken: AccessToken,
  RefreshToken: RefreshToken
};