const db = require('../database/database');

module.exports = class Ticket {
  constructor(priority, title, status, description, projectId) {
    this.priority = priority;
    this.title = title;
    this.status = status;
    this.description = description;
    this.projectId = projectId;
  };

  create() {
    return db.execute(
      'INSERT INTO tickets (priority, title, status, description, projectId) VALUES (?, ?, ?, ?, ?)',
      [this.priority, this.title, this.status, this.description, this.projectId]
    );
  };

  static findAll() {
    return db.execute(
      `SELECT 
        tickets.id, tickets.priority, tickets.title, tickets.status, projects.title as project 
      FROM 
        tickets, projects 
      WHERE
        tickets.projectId=projects.id`
      );
  };

  static findById(id) {
    return db.execute('SELECT * FROM tickets WHERE id=' + id);
  };
};