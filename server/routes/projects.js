const { Router } = require('express');

const paginationControllers = require('../controllers/pagination');
const projectControllers = require('../controllers/project');

const router = Router();

// get an individual project
router.get('/projects/project/:id', projectControllers.getAProject);
// get all projects
router.get(
  '/projects/:orderBy/:pageNumber', 
  paginationControllers.calcPagination('projects'), 
  projectControllers.getProjects
);

// post a new project
router.post('/projects', projectControllers.postCreateProject);

module.exports = router;