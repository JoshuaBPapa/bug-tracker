const db = require('../database/database');

module.exports = class Pagination {
  static getTotalRowCount(table, foreignTable, foreignId) {
    return db.execute(
      `SELECT
        COUNT(*) AS totalRows
      FROM
        ${table}
      ${foreignTable ?
        `WHERE
          ${table}.${foreignTable}Id = ${foreignId}`
        : null}`
    );
  };
};