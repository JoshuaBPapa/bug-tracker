const Project = require('../models/project');

exports.getProjects = (req, res) => {
  Project.findAll()
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
 
exports.createProject = (req, res) => {
  const projectName = req.body.name;

  Project.create({ name: projectName})
  .then(() => {
    res.status(201).send('POST complete.');
  })
  .catch(err => {
    console.log(err)
  });
};