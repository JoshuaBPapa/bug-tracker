const Ticket = require('../models/ticket');

exports.getTickets = (req, res) => {
  const orderBy = req.params.orderBy.replace("-", " ");
  const { totalPageCount, totalRows, pageNumber } = res.locals;
  Ticket.findAll(orderBy, pageNumber)
    .then(tickets => {
      res.status(200).send({
        results: tickets[0],
        totalPages: totalPageCount,
        totalResults: totalRows
      })
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getATicket = (req, res) => {
  Ticket.findById(req.params.id)
    .then(ticket => {
      res.status(200).send(ticket[0][0]);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProjectTickets = (req, res) => {
  const orderBy = req.params.orderBy.replace("-", " ");
  const { id } = req.params;
  const { totalPageCount, totalRows, pageNumber } = res.locals;
  Ticket.findProjectTickets(id, orderBy, pageNumber)
    .then(tickets => {
      res.status(200).send({
        results: tickets[0],
        totalPages: totalPageCount,
        totalResults: totalRows
      })
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postCreateTicket = (req, res) => {
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
      console.log(err)
    });
};

exports.putUpdateTicket = (req, res) => {
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
      console.log(err);
    });
};