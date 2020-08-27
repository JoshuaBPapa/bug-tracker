const Ticket = require('../models/ticket');

exports.getTickets = (req, res, next) => {
  const orderBy = req.params.orderBy.replace("-", " ");
  const { totalPageCount, totalRows, pageNumber } = res.locals;
  Ticket.findAll(orderBy, pageNumber)
    .then(tickets => {
      if (!tickets[0].length) {
        return res.status(404).send('No Tickets.');
      };
      res.status(200).send({
        results: tickets[0],
        totalPages: totalPageCount,
        totalResults: totalRows
      })
    })
    .catch(err => {
      next(err);
    });
};

exports.getATicket = (req, res, next) => {
  Ticket.findById(req.params.id)
    .then(ticket => {
      if (!ticket[0].length) {
        return res.status(404).send('Ticket not found.');
      };
      res.status(200).send(ticket[0][0]);
    })
    .catch(err => {
      next(err);
    });
};

exports.getProjectTickets = (req, res, next) => {
  const orderBy = req.params.orderBy.replace("-", " ");
  const { id } = req.params;
  const { totalPageCount, totalRows, pageNumber } = res.locals;
  Ticket.findProjectTickets(id, orderBy, pageNumber)
    .then(tickets => {
      if (!tickets[0].length) {
        return res.status(404).send('No Tickets.');
      };
      res.status(200).send({
        results: tickets[0],
        totalPages: totalPageCount,
        totalResults: totalRows
      })
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
    req.params.assignedProjectId
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
    req.body.priority
  )
    .then(() => {
      res.status(200).json({ id: editId });
    })
    .catch(err => {
      next(err);
    });
};