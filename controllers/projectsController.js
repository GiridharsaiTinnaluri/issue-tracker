const Project = require('../models/projectModel');
const ISSUES = require('../models/issuesModel');

// GET - /
// public route
// renders the home page
const getAllProjects = (req, res) => {
    return res.render('home');
}

// GET - /createProject
// public route
// renders the create project page
const getCreateProject = (req, res) => {
    return res.render('createProject');
}

// POST - /createProject
// public route
// gets the data and create snew project
const postCreateProject =async (req, res) => {
    try{
        //gets the data from the req body
        const {projectName, projectAuthor, projectDesc} = req.body;

        // validate Input
        if(!projectName.trim() || !projectAuthor.trim() || !projectDesc.trim()) {
            req.flash('error', 'Please provide all fields');
            return res.redirect('back');
        }

        // All field are ther ,crete the project
        const newProject = await Project.create({
            name: projectName.toLowerCase(),
            author: projectAuthor.toLowerCase(),
            descritption: projectDesc.toLowerCase()
        })
        
        if(!newProject) {
            req.flash('error', 'Please user data');
            return res.redirect('back');
        }

        req.flash('success', 'project created!' )
        return res.redirect('/');
    } catch(err) {
        console.log(err);
        req.flash('error', 'something went wrong' )
        return res.redirect('/');
    }
}

// GET - /createIssue/:id
// public route
// renders the create issue page
const getProjectDetails = async (req, res) => {
    try {
        const id = req.params.id
        let labels = [];
        let authors= [];
        let totalIssues= 0;
        const proj = await Project.findById(id);
        if(!proj) {
            console.log(err);
            req.flash('success', 'Invalid product ID' )
            return res.redirect('back');
        }

        const issues = await ISSUES.find({projectId: id})
        totalIssues= issues.length

        for(i of issues) {
            console.log(i.labels);
            authors = authors.concat(i.author);
            labels = labels.concat(i.labels);
        }

        labels = new Set(labels);
        console.log(labels);
        res.cookie('projectDetails', {totalIssues, labels: [...labels], authors});

        return res.render('projectDetailsPage', {
            projectDetails: proj,
            issues,
            isIssues: issues.length < 1,
            totalIssues,
            labels,
            authors
        }); 
         
    } catch(err) {
        console.log(err);
        req.flash('error', 'something went wrong' )
        return res.redirect('/');
    }
}

const search = async(req, res) => {
    try {
        //gets fields from req body
        let {searchProject} = req.body;
        searchProject = searchProject.toLowerCase() ? searchProject.toLowerCase() : " ";
        //validates input
        

        // searching the issues by title and description
        const projects = await Project.find({name: {$regex: searchProject}});
        console.log("108:", projects);
        if(!projects || projects.length < 1) {
            req.flash('info', 'no products found');
            return res.redirect('/');
        }
        return res.render('home', {
             projects: projects,
        });
         
    } catch(err) {
        console.log(err)
        req.flash('error', 'Internal server error');
        return res.redirect('/');
    }
}

module.exports = {
    getAllProjects,
    getCreateProject,
    postCreateProject,
    getProjectDetails,
    search
}