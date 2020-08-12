const Ticket = require('../models/ticket');
const Project = require('../models/project');

exports.getTickets = (req, res) => {
  Ticket.findAll({ include: { model: Project }, attributes: { exclude: ['projectId'] }})
  .then(tickets => {
    if (tickets.length) {
      res.status(200).send(tickets);
    } else {
      res.status(204).send('No tickets found.');
    }
  })
  .catch(err => {
    console.log(err);
  })
};

exports.getATicket = (req, res) => {
  Ticket.findByPk(
    req.params.ticketId,
    {
      include: { model: Project }, 
      attributes: { exclude: ['projectId']
    }
  })
  .then(ticket => {
    if (ticket) {
      res.status(200).send(ticket);
    } else {
      res.status(204).send('No ticket found.');
    }
  })
  .catch(err => {
    console.log(err);
  })
}

exports.postCreateTicket = (req, res) => {
  Ticket.create({ 
    name: req.body.name, 
    priority: req.body.priority,
    status: req.body.status,
    projectId: req.body.projectId
  })
  .then(() => {
    res.status(201).send('Post Complete')
  })
  .catch(err => {
    console.log(err)
  })
};