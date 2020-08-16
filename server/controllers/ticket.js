const Ticket = require('../models/ticket');

exports.getTickets = (req, res) => {
  Ticket.findAll()
    .then(tickets => {
      res.status(200).send(tickets[0])
    })
    .catch(err => {
      console.log(err);
    })
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
    })
};

exports.getATicket = (req, res) => {
  Ticket.findById(req.params.id)
  .then(ticket => {
    res.status(200).send(ticket[0]);
  })
  .catch(err => {
    console.log(err);
  });
};