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

      res.status(200).json({
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
  Ticket.findById(req.params.ticketId, req.teamId)
    .then(ticket => {
      if (!ticket[0].length) {
        const error = new Error;
        error.message = 'Ticket not found.';
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json(ticket[0][0]);
    })
    .catch(err => {
      next(err);
    });
};

exports.getUsersAssignedToTicket = (req, res, next) => {
  Ticket.findUsersAssignedToTicket(req.params.ticketId, req.teamId)
    .then(users => {
      res.status(200).send(users[0]);
    })
    .catch(err => {
      next(err);
    });
};

exports.getProjectTickets = (req, res, next) => {
  const orderBy = req.params.orderBy.replace("-", " ");

  Ticket.findProjectTickets(
    req.params.parentId,
    orderBy,
    req.pageNumber,
    req.teamId,
    req.userId
  )
    .then(tickets => {
      if (!tickets[0].length) {
        const error = new Error;
        error.message = 'No tickets found.';
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({
        results: tickets[0],
        totalPages: req.totalPageCount,
        totalResults: req.totalRows
      });
    })
    .catch(err => {
      next(err);
    });
};

exports.findTicketsAssignedToUser = (req, res, next) => {
  const orderBy = req.params.orderBy.replace("-", " ");

  Ticket.findTicketsAssignedToUser(
    req.params.userId,
    orderBy,
    req.pageNumber,
    req.teamId
  )
    .then(tickets => {
      if (!tickets[0].length) {
        const error = new Error;
        error.message = 'No tickets found.';
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({
        results: tickets[0],
        totalPages: req.totalPageCount,
        totalResults: req.totalRows
      });
    })
    .catch(err => {
      next(err);
    });
};

exports.findTicketComments = (req, res, next) => {
  Ticket.findTicketComments(req.params.ticketId, req.teamId)
    .then(comments => {
      if (!comments[0].length) {
        const error = new Error;
        error.message = 'This ticket has no comments.';
        error.statusCode = 404;
        throw error;
      }

      res.status(200).send(comments[0]);
    })
    .catch(err => {
      next(err);
    });
};

exports.findTicketsCreatedByUser = (req, res, next) => {
  const orderBy = req.params.orderBy.replace("-", " ");

  Ticket.findTicketsCreatedByUser(
    req.params.userId,
    req.pageNumber,
    orderBy,
    req.teamId
  )
    .then(tickets => {
      if (!tickets[0].length) {
        const error = new Error;
        error.message = 'No tickets found.';
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({
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

exports.putAssignUsersToTicket = (req, res, next) => {
  const ticketId = req.params.ticketId;
  const teamId = req.teamId;

  Ticket.deleteUsersAssignedToTicket(ticketId, teamId)
    .then(() => {
      const values = [];

      // only return the assignUsersToTicket promise if there were userids provided in the req
      if (req.body.userIds.length) {
        const userIds = req.body.userIds.split(',');

        userIds.forEach(userId => {
          values.push([userId, ticketId, teamId]);
        });

        return Ticket.assignUsersToTicket(values)
      }

      return true;
    })
    .then(() => {
      res.status(200).send('User(s) assigned to the ticket');
    })
    .catch(err => {
      next(err);
    });
};

exports.deleteTicket = (req, res, next) => {
  Ticket.deleteTicket(req.params.ticketId, req.teamId)
    .then(() => {
      res.status(200).send('Ticket successfully deleted.');
    })
    .catch(err => {
      next(err);
    });
};