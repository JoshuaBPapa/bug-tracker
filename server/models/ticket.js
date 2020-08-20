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

  static findAll(orderBy, pageNumber) {
    return db.execute(
      `SELECT 
        tickets.id, tickets.priority, tickets.title, tickets.status, tickets.created, projects.title AS project
      FROM 
        tickets, projects 
      WHERE
        tickets.projectId = projects.id
      ORDER BY
        ${orderBy}
      LIMIT
        ${(pageNumber - 1) * 10}, 10`
    );
  };

  static findById(id, orderBy) {
    return db.execute(
      `SELECT
        tickets.id, tickets.priority, tickets.title, tickets.status, tickets.description, projects.title AS project
      FROM
        tickets, projects
      WHERE
        tickets.id = ${id} AND tickets.projectId = projects.id
      ORDER BY
        ${orderBy}`
    );
  };

  static findProjectTickets(projectId, orderBy, pageNumber) {
    return db.execute(
      `SELECT 
        tickets.id, tickets.priority, tickets.title, tickets.status, tickets.created
      FROM 
        tickets
      WHERE
        tickets.projectId = ${projectId}
      ORDER BY
        ${orderBy}
      LIMIT
        ${(pageNumber - 1) * 10}, 10`
    );
  };
};