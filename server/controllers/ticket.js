const Ticket = require('../models/ticket');

exports.getTickets = (req, res, next) => {
  const orderBy = req.params.orderBy.replace("-", " ");

  Ticket.findAll(orderBy, req.pageNumber, req.teamId)
    .then(tickets => {
      if (!tickets[0].length) {
        const error = new Error;
        error.message = 'No tickets found.';
        error.statusCode = 404;
        throw error;
      }

      res.status(200).send({
        results: tickets[0],
        totalPages: req.totalPageCount,
        totalResults: req.totalRows
      });
    })
    .catch(err => {
      next(err);
    });
};

exports.getATicket = (req, res, next) => {
  Ticket.findById(req.params.id, req.teamId)
    .then(ticket => {
      if (!ticket[0].length) {
        const error = new Error;
        error.message = 'Ticket not found.';
        error.statusCode = 404;
        throw error;
      }

      res.status(200).send(ticket[0][0]);
    })
    .catch(err => {
      next(err);
    });
};

exports.getProjectTickets = (req, res, next) => {
  const orderBy = req.params.orderBy.replace("-", " ");

  Ticket.findProjectTickets(req.params.parentId, orderBy, req.pageNumber, req.teamId)
    .then(tickets => {
      if (!tickets[0].length) {
        const error = new Error;
        error.message = 'No tickets found.';
        error.statusCode = 404;
        throw error;
      }

      res.status(200).send({
        results: tickets[0],
        totalPages: req.totalPageCount,
        totalResults: req.totalRows
      });
    })
    .catch(err => {
      next(err);
    });
};

exports.getUserTickets = (req, res, next) => {
  const orderBy = req.params.orderBy.replace("-", " ");

  Ticket.findUserTickets(req.params.parentId, orderBy, req.pageNumber, req.teamId)
    .then(tickets => {
      if (!tickets[0].length) {
        const error = new Error;
        error.message = 'No tickets found.';
        error.statusCode = 404;
        throw error;
      }

      res.status(200).send({
        results: tickets[0],
        totalPages: req.totalPageCount,
        totalResults: req.totalRows
      });
    })
    .catch(err => {
      next(err);
    });
};

exports.postCreateTicket = (req, res, next) => {
  const newTicket = new Ticket(
    req.body.priority,
    req.body.title,
    req.body.status,
    req.body.description,
    req.params.assignedProjectId,
    req.userId,
    req.teamId
  );

  newTicket.create()
    .then(ticket => {
      res.status(201).json({ id: ticket[0].insertId });
    })
    .catch(err => {
      next(err);
    });
};

exports.putUpdateTicket = (req, res, next) => {
  const { editId } = req.params;
  
  Ticket.update(
    editId,
    req.body.title,
    req.body.description,
    req.body.status,
    req.body.priority,
    req.teamId
  )
    .then(() => {
      res.status(200).json({ id: editId });
    })
    .catch(err => {
      next(err);
    });
};