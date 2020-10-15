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
        tickets.id, tickets.priority, tickets.title, tickets.status, tickets.created, tickets.created, tickets.projectId, projects.title as projectTitle, COUNT(user_tickets.userId) AS usersAssigned
      FROM 
        tickets 
      LEFT JOIN
        user_tickets ON user_tickets.ticketId = tickets.id
      LEFT JOIN
        projects ON projects.id = tickets.projectId
      WHERE
        tickets.teamId = ${teamId}
      GROUP BY
        tickets.id
      ORDER BY
        ${orderBy}
      LIMIT
        ${(pageNumber - 1) * 10}, 10`
    );
  };

  static findById(id, teamId) {
    return db.execute(
      `SELECT
        tickets.id, tickets.priority, tickets.title, tickets.status, tickets.description, tickets.created, tickets.projectId, tickets.userId, projects.title as projectTitle, users.name AS createdBy
      FROM
        tickets
      JOIN
        projects ON tickets.projectId = projects.id
      LEFT JOIN
        users ON tickets.userId = users.id
      WHERE
        tickets.id = ${id} AND tickets.teamId = ${teamId}`
    );
  };

  static findProjectTickets(projectId, orderBy, pageNumber, teamId) {
    return db.execute(
      `SELECT 
        tickets.id, tickets.priority, tickets.title, tickets.status, tickets.created, COUNT(user_tickets.userId) AS usersAssigned
      FROM 
        tickets
      LEFT JOIN
        user_tickets ON tickets.id = user_tickets.ticketId
      WHERE
        tickets.projectId = ${projectId} AND tickets.teamId = ${teamId}
      GROUP BY
        tickets.id
      ORDER BY
        ${orderBy}
      LIMIT
        ${(pageNumber - 1) * 10}, 10`
    );
  };

  static findTicketsAssignedToUser(userId, orderBy, pageNumber, teamId) {
    return db.execute(
      `SELECT 
        tickets.id, tickets.priority, tickets.title, tickets.status, tickets.description, tickets.created, tickets.projectId, projects.title as projectTitle
      FROM 
        tickets
      JOIN
        projects on projects.id = tickets.projectId
      INNER JOIN
        user_tickets on user_tickets.userId = ${userId}
      WHERE
        tickets.teamId = ${teamId} AND tickets.id = user_tickets.ticketId
      GROUP BY
       tickets.id
      ORDER BY
        ${orderBy}
      LIMIT
        ${(pageNumber - 1) * 10}, 10`
    );
  };

  static findTicketsCreatedByUser(userId, pageNumber, orderBy, teamId) {
    return db.execute(
      `SELECT 
        tickets.id, tickets.priority, tickets.title, tickets.status, tickets.description, tickets.created, tickets.projectId, projects.title as projectTitle
      FROM 
        tickets, projects
      WHERE
        tickets.teamId = ${teamId} AND tickets.userId = ${userId}
      GROUP BY
        tickets.id
      ORDER BY
        ${orderBy}
      LIMIT
        ${(pageNumber - 1) * 10}, 10`
    );
  };

  static findUsersAssignedToTicket(ticketId, teamId) {
    return db.execute(
      `SELECT
        users.id, users.name, users.jobTitle
      FROM
        users
      INNER JOIN
        user_tickets ON users.id = user_tickets.userId
      WHERE
        user_tickets.ticketId = ${ticketId} AND user_tickets.teamId = ${teamId}`
    );
  };

  static deleteUsersAssignedToTicket(ticketId, teamId) {
    return db.execute(
      `DELETE FROM
        user_tickets
      WHERE 
        user_tickets.ticketId = ${ticketId} AND user_tickets.teamId = ${teamId}`
    );
  };

  static assignUsersToTicket(values) {
    return db.query(
      'INSERT INTO user_tickets (userId, ticketId, teamId) VALUES ?',
      [values]
    );
  };

  static deleteTicket(ticketId, teamId) {
    return db.execute(
      `DELETE FROM
        tickets
      WHERE 
        tickets.id = ${ticketId} AND tickets.teamId = ${teamId}`
    );
  };
};