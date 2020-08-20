const db = require('../database/database');

module.exports = class Project {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  };

  create() {
    return db.execute(
      'INSERT INTO projects (title, description) VALUES (?, ?)',
      [this.title, this.description]
    );
  };

  static findAll(orderBy, pageNumber) {
    return db.execute(
      `SELECT 
        projects.id, projects.title, projects.created, COUNT(tickets.projectId) AS tickets
      FROM 
        projects 
      LEFT JOIN
        tickets ON tickets.projectId = projects.id
      GROUP BY
        projects.id
      ORDER BY
        ${orderBy}
      LIMIT
        ${(pageNumber - 1) * 10}, 10`
    );
  };

  static findById(id) {
    return db.execute(
      `SELECT 
        projects.id, projects.title, projects.description, projects.created
      FROM 
        projects 
      WHERE 
        projects.id = ${id}`
    );
  };
};