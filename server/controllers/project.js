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

exports.getAProject = (req, res) => {
  Project.findByPk(req.params.projectId, {
    include: {
      model: Ticket
    }
  })
  .then(project => {
    if (project) {
      res.status(200).send(project);
    } else {
      res.status(204).send('No project found.');
    }
  })
  .catch(err => {
    res.send(err);
  });
}
 
exports.postCreateProject = (req, res) => {
  const { body: { title, description } } = req;

  Project.create({ title, description })
  .then(() => {
    res.status(201).send('POST complete.');
  })
  .catch(err => {
    console.log(err);
  });
};