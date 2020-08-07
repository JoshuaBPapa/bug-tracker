const { Router } = require('express');

const projectControllers = require('../controllers/project');

const router = Router();

router.get('/projects', projectControllers.getProjects);

router.post('/projects', projectControllers.createProject);

module.exports = router;