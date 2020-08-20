const Ticket = require('../models/ticket');

exports.getTickets = (req, res) => {
  const orderBy = req.params.orderBy.replace("-", " ");
  const { totalPageCount, totalRows, pageNumber} = res.locals;
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
  const orderBy = req.params.orderBy.replace("-", " ");
  Ticket.findById(req.params.id, orderBy)
  .then(ticket => {
    res.status(200).send(ticket[0]);
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getProjectTickets = (req, res) => {
  const orderBy = req.params.orderBy.replace("-", " ");
  const { id } = req.params;
  const { totalPageCount, totalRows, pageNumber} = res.locals;
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
    req.body.projectId
  );
  newTicket.create()
    .then(() => {
      res.status(201).send("POST complete")
    })
    .catch(err => {
      console.log(err)
    });
};