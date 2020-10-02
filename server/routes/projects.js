const { Router } = require('express');

const paginationControllers = require('../controllers/pagination');
const projectControllers = require('../controllers/project');
const validation = require('../middleware/validation');

const router = Router();

// GET an individual project
router.get('/projects/project/:id', projectControllers.getAProject);
// GET all projects
router.get(
  '/projects/:orderBy/:pageNumber', 
  paginationControllers.calcPagination('projects'), 
  projectControllers.getProjects
);

// POST a new project
router.post('/projects',
  validation.validateProject,
  projectControllers.postCreateProject
);

// PUT a project
router.put('/projects/project/:editId',
  validation.validateProject,
  projectControllers.putUpdateProject
);

module.exports = router;