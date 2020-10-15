const db = require('../database/database');

module.exports = class Team {
  constructor(teamName) {
    this.teamName = teamName;
  };

  create() {
    return db.execute(
      'INSERT INTO teams (teamName) VALUES (?)',
      [this.teamName]
    );
  };

  static findByTeamName(teamName) {
    return db.execute(
      `SELECT 
        teams.id
      FROM
        teams
      WHERE
        teams.teamName = "${teamName}"`
    );
  };

  static deleteTeam(teamId)  {
    return db.execute(
      `DELETE FROM
        teams
      WHERE
        teams.id = ${teamId}`
    );
  };
};