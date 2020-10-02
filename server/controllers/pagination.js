const Pagination = require('../models/pagination');

exports.calcPagination = (table, parentTable) => {
  return (req, res, next) => {
    const { parentId } = req.params;
    let pageNumber = Number(req.params.pageNumber);

    if (!parentId) parentTable = null;

    // parent table must be passed in singular form. For example: project, user
    Pagination.getTotalRowCount(table, parentTable, parentId, req.teamId)
      .then(count => {
        const totalRows = count[0][0].totalRows;
        const totalPages = Math.ceil(totalRows / 10);

        if (pageNumber > totalPages) pageNumber = 1;
        
        req.totalPageCount = totalPages;
        req.totalRows = totalRows;
        req.pageNumber = pageNumber;

        next();
      })
      .catch(err => {
        next(err);
      });
  };
};

