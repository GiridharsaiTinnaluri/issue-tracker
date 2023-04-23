const route = require('express').Router();

const {
    projectController
} = require('../controllers');



// route.get('/', projectController.getAllProjects);
route.get('/createProject', projectController.getCreateProject);
route.post('/createProject', projectController.postCreateProject);
route.get('/projectDetails/:id', projectController.getProjectDetails);
route.post('/search', projectController.search);
route.get('/search', (req, res) => {
    res.redirect('/');
});

module.exports = route;