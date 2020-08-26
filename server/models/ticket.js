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

  static update(editId, title, description, status, priority) {
    return db.execute(
      `UPDATE
        tickets
      SET
        title = "${title}", description = "${description}", status = "${status}", priority = "${priority}"
      WHERE
        id = ${editId}`
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

  static findById(id) {
    return db.execute(
      `SELECT
        tickets.id, tickets.priority, tickets.title, tickets.status, tickets.description, tickets.created, tickets.projectId, projects.title AS projectTitle
      FROM
        tickets, projects
      WHERE
        tickets.id = ${id} AND tickets.projectId = projects.id`
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