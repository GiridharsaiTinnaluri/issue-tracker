const route = require('express').Router();

const {
    issuesController
} = require('../controllers');



route.get('/createIssue/:id', issuesController.getCreateIssue);
route.post('/createIssue/:id', issuesController.postCreateIssue);
route.post('/searchIssue/:id', issuesController.searchIssue);
route.get('/searchIssue/:id', (req, res) => {
    res.redirect(`/App/v1/projects/projectDetails/${req.params.id}`);
});
route.post('/filterIssue/:id', issuesController.filterIssue);


module.exports = route;