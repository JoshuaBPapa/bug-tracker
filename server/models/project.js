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

  static findAll() {
    return db.execute(`
      SELECT 
        projects.id, projects.title, projects.createdAt, COUNT(tickets.projectId) AS tickets 
      FROM 
        projects LEFT JOIN
        tickets ON tickets.projectId = projects.id
      GROUP BY
        projects.id`
    );
  };

  static findById(id) {
    return db.execute('SELECT * FROM projects WHERE id=' + id);
  }
};