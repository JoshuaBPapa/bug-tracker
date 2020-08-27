const Project = require('../models/project');

exports.getProjects = (req, res, next) => {
  const orderBy = req.params.orderBy.replace("-", " ");
  const { totalPageCount, totalRows, pageNumber } = res.locals;
  Project.findAll(orderBy, pageNumber)
    .then(projects => {
      if (!projects[0].length) {
        return res.status(404).send('No Projects.');
      };
      res.status(200).send({
        results: projects[0],
        totalPages: totalPageCount,
        totalResults: totalRows
      });
    })
    .catch(err => {
      next(err);
    });
};

exports.getAProject = (req, res, next) => {
  const { id } = req.params;
  Project.findById(id)
    .then(project => {
      if (!project[0].length) {
        return res.status(404).send('Project not found.');
      };
      res.status(200).send(project[0][0]);
    })
    .catch(err => {
      next(err);
    });
};

exports.postCreateProject = (req, res, next) => {
  const newProject = new Project(
    req.body.title,
    req.body.description
  );
  newProject.create()
    .then(project => {
      res.status(201).json({ id: project[0].insertId });
    })
    .catch(err => {
      next(err);
    });
};

exports.putUpdateProject = (req, res, next) => {
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
      next(err);
    });
}