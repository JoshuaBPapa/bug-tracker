const db = require('../database/database');

module.exports = class User {
  constructor(email, username, password, name, jobTitle, authLevel, teamId) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.name = name;
    this.jobTitle = jobTitle;
    this.authLevel = authLevel
    this.teamId = teamId;
  };

  create() {
    return db.execute(
      'INSERT INTO users (email, username, password, name, jobTitle, authlevel, teamId) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        this.email, 
        this.username, 
        this.password, 
        this.name, 
        this.jobTitle, 
        this.authLevel, 
        this.teamId
      ]
    );
  };

  static update(editId, name, jobTitle, authLevel, teamId) {
    return db.execute(
      `UPDATE
        users
      SET
        name = "${name}", jobTitle = "${jobTitle}", authLevel = "${authLevel}"
      WHERE
        users.id = ${editId} AND users.teamId = ${teamId}`
    );
  };

  static updatePw(editId, newPassword, teamId) {
    return db.execute(
      `UPDATE
        users
      SET
        password = "${newPassword}"
      WHERE
        users.id = ${editId} AND users.teamId = ${teamId}`
    );
  };

  static findByEmail(email) {
    return db.execute(
      `SELECT
        users.id
      FROM
        users
      WHERE
        users.email = "${email}"`
    );
  };

  static findByUsername(username, teamId) {
    return db.execute(
      `SELECT
        users.id, users.password, users.authLevel
      FROM
        users
      WHERE
        users.username = "${username}" AND users.teamId = ${teamId}`
    );
  };

  static findAll(orderBy, pageNumber, teamId) {
    return db.execute(
      `SELECT
        users.id, users.email, users.username, users.name, users.jobTitle, users.authLevel, COUNT(user_tickets.userId) AS tickets
      FROM
        users
      LEFT JOIN
        user_tickets ON user_tickets.userId = users.id
      WHERE
        users.teamId = ${teamId}
      GROUP BY
        users.id
      ORDER BY
        ${orderBy}
      LIMIT
        ${(pageNumber - 1) * 10}, 10`
    );
  };

  static findById(id, teamId) {
    return db.execute(
      `SELECT
        users.id, users.email, users.username, users.name, users.jobTitle, users.authLevel
      FROM
        users
      WHERE
        users.id = ${id} AND users.teamId = ${teamId}`
    );
  };

  static findUsersToAssign(teamId) {
    return db.execute(
      `SELECT
        users.id, users.name, users.jobTitle
      FROM
        users
      WHERE
        users.teamId = ${teamId}`
    );
  };

  static deleteUser(userId, teamId) {
    return db.execute(
      `DELETE FROM
        users
      WHERE 
        users.id = ${userId} AND users.teamId = ${teamId}`
    );
  };
};