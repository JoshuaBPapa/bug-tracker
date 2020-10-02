const Project = require('../models/project');

exports.getProjects = (req, res, next) => {
  const orderBy = req.params.orderBy.replace("-", " ");

  Project.findAll(orderBy, req.pageNumber, req.teamId)
    .then(projects => {
      if (!projects[0].length) {
        const error = new Error;
        error.message = 'No projects found.';
        error.statusCode = 404;
        throw error;
      }

      res.status(200).send({
        results: projects[0],
        totalPages: req.totalPageCount,
        totalResults: req.totalRows
      });
    })
    .catch(err => {
      next(err);
    });
};

exports.getAProject = (req, res, next) => {
  Project.findById(req.params.id, req.teamId)
    .then(project => {
      if (!project[0].length) {
        const error = new Error;
        error.message = 'Project not found.';
        error.statusCode = 404;
        throw error;
      }

      res.status(200).send(project[0][0]);
    })
    .catch(err => {
      next(err);
    });
};

exports.postCreateProject = (req, res, next) => {
  const newProject = new Project(
    req.body.title,
    req.body.description,
    req.teamId
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
    req.body.description,
    req.teamId
  )
    .then(() => {
      res.status(200).json({ id: editId });
    })
    .catch(err => {
      next(err);
    });
};