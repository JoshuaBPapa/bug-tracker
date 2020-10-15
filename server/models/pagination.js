const db = require('../database/database');

module.exports = class Pagination {
  // The WHERE filter changes depending on if there is a parentTable present
  static getTotalRowCount(table, parentTable, parentId, teamId) {
    return db.execute(
      `SELECT
        COUNT(*) AS totalRows
      FROM
        ${table}
      ${parentTable ? 
        `WHERE
          ${table}.${parentTable}Id = ${parentId} AND ${table}.teamId = ${teamId}`
        : `WHERE
          ${table}.teamId = ${teamId}`}`
    );
  };

  static getTotalRowCountUserTickets = (userId, teamId) => {
    return db.execute(
      `SELECT
        COUNT(*) AS totalRows
      FROM
        user_tickets
      WHERE
        user_tickets.teamId = ${teamId} AND user_tickets.userId = ${userId}`
    );
  };
};