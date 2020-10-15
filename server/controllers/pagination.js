const Pagination = require('../models/pagination');

const setPagination = (req, count, next) => {
  const totalRows = count[0][0].totalRows;
  const totalPages = Math.ceil(totalRows / 10);
  let pageNumber = Number(req.params.pageNumber);

  if (pageNumber > totalPages) pageNumber = 1;

  req.totalPageCount = totalPages;
  req.totalRows = totalRows;
  req.pageNumber = pageNumber;

  next();
};

exports.calcPagination = (table, parentTable) => {
  return (req, res, next) => {
    const { parentId } = req.params;
    if (!parentId) parentTable = null;

    // parent table must be passed in singular form. For example: project, user
    Pagination.getTotalRowCount(table, parentTable, parentId, req.teamId)
      .then(count => {
        setPagination(req, count, next);
      })
      .catch(err => {
        next(err);
      });
  };
};

exports.calcPaginationUserTickets = (req, res, next) => {
  Pagination.getTotalRowCountUserTickets(req.params.userId, req.teamId)
    .then(count => {
      setPagination(req, count, next);
    })
    .catch(err => {
      next(err);
    });
};
