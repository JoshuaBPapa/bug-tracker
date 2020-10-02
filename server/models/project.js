const db = require('../database/database');

module.exports = class Project {
  constructor(title, description, teamId) {
    this.title = title;
    this.description = description;
    this.teamId = teamId;
  };

  create() {
    return db.execute(
      'INSERT INTO projects (title, description, teamId) VALUES (?, ?, ?)',
      [this.title, this.description, this.teamId]
    );
  };

  static update(editId, title, description, teamId) {
    return db.execute(
      `UPDATE 
        projects
      SET
        title = "${title}", description = "${description}"
      WHERE
       projects.id = ${editId} AND projects.teamId = ${teamId}`
    );
  };

  static findAll(orderBy, pageNumber, teamId) {
    return db.execute(
      `SELECT 
        projects.id, projects.title, projects.created, COUNT(tickets.projectId) AS tickets
      FROM 
        projects 
      LEFT JOIN
        tickets ON tickets.projectId = projects.id AND tickets.teamId = ${teamId}
      WHERE
        projects.teamId = ${teamId}
      GROUP BY
        projects.id
      ORDER BY
        ${orderBy}
      LIMIT
        ${(pageNumber - 1) * 10}, 10`
    );
  };

  static findById(id, teamId) {
    return db.execute(
      `SELECT 
        projects.id, projects.title, projects.description, projects.created
      FROM 
        projects 
      WHERE 
        projects.id = ${id} AND projects.teamId = ${teamId}`
    );
  };
};