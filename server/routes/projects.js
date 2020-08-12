const { Router } = require('express');

const projectControllers = require('../controllers/project');

const router = Router();

router.get('/projects', projectControllers.getProjects);
router.get('/projects/project/:id', projectControllers.getAProject);

router.post('/projects', projectControllers.postCreateProject);

module.exports = router;