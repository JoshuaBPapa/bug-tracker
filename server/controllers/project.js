const Project = require('../models/project');

exports.getProjects = (req, res) => {
  const orderBy = req.params.orderBy.replace("-", " ");
  const { totalPageCount, totalRows, pageNumber } = res.locals;
  Project.findAll(orderBy, pageNumber)
    .then(projects => {
      res.status(200).send({
        results: projects[0],
        totalPages: totalPageCount,
        totalResults: totalRows
      });
    })
    .catch(err => {
      console.log(err)
    });
};

exports.getAProject = (req, res) => {
  const { id } = req.params;
  Project.findById(id)
    .then(project => {
      res.status(200).send(project[0][0]);
    })
    .catch(err => {
      console.log(err)
    });
};

exports.postCreateProject = (req, res) => {
  const newProject = new Project(
    req.body.title,
    req.body.description
  );
  newProject.create()
    .then(project => {
      res.status(201).json({ id: project[0].insertId });
    })
    .catch(err => {
      console.log(err)
    });
};

exports.putUpdateProject = (req, res) => {
  const { editId } = req.params;
  Project.update(
    editId,
    req.body.title,
    req.body.description
  )
    .then(() => {
      res.status(200).json({ id: editId });
    })
    .catch(err => {
      console.log(err)
    });
}