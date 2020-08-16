const Project = require('../models/project');

exports.getProjects = (req, res) => {
  Project.findAll()
    .then(projects => {
      res.status(200).send(projects[0])
    })
    .catch(err => {
      console.log(err)
    });
}

exports.postCreateProject = (req, res) => {
  const newProject = new Project(
    req.body.title,
    req.body.description
  );
  newProject.create()
    .then(() => {
      res.status(201).send("POST complete")
    })
    .catch(err => {
      console.log(err)
    })
};

exports.getAProject = (req, res) => {
  Project.findById(req.params.id)
  .then(project => {
    res.status(200).send(project[0]);
  })
  .catch(err => {
    console.log(err);
  });
};