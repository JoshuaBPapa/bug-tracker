const { Router } = require('express');

const paginationControllers = require('../controllers/pagination');
const projectControllers = require('../controllers/project');
const validationMiddleware = require('../middleware/validation');

const router = Router();

// GET an individual project
router.get('/projects/project/:projectId', projectControllers.getAProject);
// GET all projects
router.get(
  '/projects/:orderBy/:pageNumber', 
  paginationControllers.calcPagination('projects'), 
  projectControllers.getProjects
);

// POST a new project
router.post(
  '/projects',
  validationMiddleware.validateProject,
  projectControllers.postCreateProject
);

// PUT a project
router.put(
  '/projects/project/:editId',
  validationMiddleware.validateProject,
  projectControllers.putUpdateProject
);

// DELETE a project
router.delete(
  '/projects/project/:projectId',
  projectControllers.deleteProject
);

module.exports = router;