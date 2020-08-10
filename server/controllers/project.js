const Sequelize = require('sequelize');

const Project = require('../models/project');
const Ticket = require('../models/ticket');

exports.getProjects = (req, res) => {
  Project.findAll({
    attributes: { 
      include: [[Sequelize.fn("COUNT", Sequelize.col("tickets.projectId")), "ticketCount"]] 
    },
    include: {
      model: Ticket
    }
  })
  .then(projects => {
    if (projects.length) {
      res.status(200).send(projects);
    } else {
      res.status(204).send('No projects found.');
    }
  })
  .catch(err => {
    res.send(err);
  });
};
 
exports.postCreateProject = (req, res) => {
  Project.create({ name: req.body.name })
  .then(() => {
    res.status(201).send('POST complete.');
  })
  .catch(err => {
    console.log(err);
  });
};