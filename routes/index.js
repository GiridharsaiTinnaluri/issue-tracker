const routes = require('express').Router();

const projectModel = require('../models/projectModel');
const projectsRoute = require('./projectRoutes');
const issuesRoute = require('./issueRoutes');
const issuesModel = require('../models/issuesModel');

// root folder for all the child routes

// home route
// gets all the projects 
routes.get('/', async (req, res) => {
    const data = await projectModel.find({}).sort({createdAt : 'desc'});
   // const issues = await issuesModel.find({}).count()
    // res.locals.totalProjects = data?.length || 0,
    // res.locals.totalIssues= issues
    return res.render('home', {
        projects: data,
    });
})

// projects route
routes.use('/App/v1/projects', projectsRoute);

// issues route
routes.use('/App/v1/Issues', issuesRoute);
 
module.exports = routes;                             