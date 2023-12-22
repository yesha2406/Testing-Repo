var express = require('express');
var router = express.Router();

const ProjectController = require('../controller/project');

/* Project Routes */
router.post('/', ProjectController.createProject);
router.get('/', ProjectController.getAllProjects);
router.get('/:id', ProjectController.getProjectDataByPk);
router.patch('/:id', ProjectController.updateProject);
router.delete('/:id', ProjectController.deleteProject);

module.exports = router;
