const projectController = require('./projectsController');
const issuesController = require('./issuesController');

// root folder for all the controllers
// importing this file can give access to all the controllers

module.exports = {
    projectController,
    issuesController
}