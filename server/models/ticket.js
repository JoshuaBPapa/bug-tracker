const db = require('../database/database');

module.exports = class Ticket {
  constructor(priority, title, status, description, projectId, userId, teamId) {
    this.priority = priority;
    this.title = title;
    this.status = status;
    this.description = description;
    this.projectId = projectId;
    this.userId = userId;
    this.teamId = teamId;
  };

  create() {
    return db.execute(
      'INSERT INTO tickets (priority, title, status, description, projectId, userId, teamId) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        this.priority, 
        this.title, 
        this.status, 
        this.description, 
        this.projectId, 
        this.userId, 
        this.teamId
      ]
    );
  };

  static update(editId, title, description, status, priority, teamId) {
    return db.execute(
      `UPDATE
        tickets
      SET
        title = "${title}", description = "${description}", status = "${status}", priority = "${priority}"
      WHERE
        tickets.id = ${editId} AND tickets.teamId = ${teamId}`
    );
  };

  static findAll(orderBy, pageNumber, teamId) {
    return db.execute(
      `SELECT 
        tickets.id, tickets.priority, tickets.title, tickets.status, tickets.created, tickets.created, tickets.projectId, projects.title as projectTitle
      FROM 
        tickets, projects
      WHERE
        tickets.projectId = projects.id AND tickets.teamId = ${teamId}
      ORDER BY
        ${orderBy}
      LIMIT
        ${(pageNumber - 1) * 10}, 10`
    );
  };

  static findById(id, teamId) {
    return db.execute(
      `SELECT
        tickets.id, tickets.priority, tickets.title, tickets.status, tickets.description, tickets.created, tickets.projectId, projects.title as projectTitle
      FROM
        tickets, projects
      WHERE
        tickets.id = ${id} AND tickets.projectId = projects.id AND tickets.teamId = ${teamId}`
    );
  };

  static findProjectTickets(projectId, orderBy, pageNumber, teamId) {
    return db.execute(
      `SELECT 
        tickets.id, tickets.priority, tickets.title, tickets.status, tickets.created
      FROM 
        tickets
      WHERE
        tickets.projectId = ${projectId} AND tickets.teamId = ${teamId}
      ORDER BY
        ${orderBy}
      LIMIT
        ${(pageNumber - 1) * 10}, 10`
    );
  };

  static findUserTickets(userId, orderBy, pageNumber, teamId) {
    return db.execute(
      `SELECT 
        tickets.id, tickets.priority, tickets.title, tickets.status, tickets.description, tickets.created, tickets.projectId, projects.title as projectTitle
      FROM 
        tickets, projects
      WHERE
        tickets.userId = ${userId} AND tickets.projectId = projects.id AND tickets.teamId = ${teamId}
      ORDER BY
        ${orderBy}
      LIMIT
        ${(pageNumber - 1) * 10}, 10`
    );
  };
};