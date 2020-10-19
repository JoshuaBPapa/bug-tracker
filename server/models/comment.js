const db = require('../database/database');

module.exports = class Comment {
  constructor(title, content, userId, ticketId, teamId) {
    this.title = title;
    this.content = content;
    this.userId = userId;
    this.ticketId = ticketId;
    this.teamId = teamId;
  };

  create() {
    return db.execute(
      'INSERT INTO comments (title, content, userId, ticketId, teamId) VALUES (?, ?, ?, ?, ?)',
      [
        this.title,
        this.content,
        this.userId,
        this.ticketId,
        this.teamId
      ]
    );
  };
};