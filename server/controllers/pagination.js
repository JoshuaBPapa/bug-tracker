const Pagination = require('../models/pagination');

exports.calcPagination = table => {
  return (req, res, next) => {
    let pageNumber = Number(req.params.pageNumber);
    const foreignId = req.params.id;
    let foreignTable = 'project';
    if (!foreignId) foreignTable = null;

    // a foreign table needs to be passed as a singular to the getTotalRowCount method. For example: project
    Pagination.getTotalRowCount(table, foreignTable, foreignId)
      .then(count => {
        const totalRows = count[0][0].totalRows;
        const totalPages = Math.ceil(totalRows / 10);
        if (pageNumber > totalPages) pageNumber = 1;
        res.locals.totalPageCount = totalPages;
        res.locals.totalRows = totalRows;
        res.locals.pageNumber = pageNumber;
        next();
      })
      .catch(err => {
        next(err);
      })
  }
}

