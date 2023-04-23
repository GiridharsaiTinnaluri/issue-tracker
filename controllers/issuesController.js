//import libraries

// import modules
const ISSUES = require('../models/issuesModel');
const PROJECT = require('../models/projectModel');

// GET - /createIssue/:id
// public route
// renders the create issue page
const getCreateIssue = (req, res) => {
    return res.render('createIssues', {
        projectID: req.params.id,
        labels :[]
    });
}

// GET - /createIssue/:id
// public route
// gets the issue data and validates and creates the new issue
const postCreateIssue =async (req, res) => {
    try {
        // gets the fields from req.body
        const id = req.params.id;
        let {issueTitle, issueAuthor, issueDesc, labels} = req.body;
        // validate Input
        if(!issueTitle.trim() || !issueAuthor.trim() || !issueDesc.trim()) {
            //throw Error('Please provide all fields');
            req.flash('error', 'Please provide all fields');
            return res.redirect('back');
        }

        if(!labels || labels.length < 1) {
            labels = [];
        } else {
            labels = labels.split(',');
            labels = labels.map(i => i.toLowerCase());
            labels = new Set(labels);
        }

        // if input is valid creates the new issue
        const newIssue = await ISSUES.create({
            title: issueTitle.toLowerCase(),
            author: issueAuthor.toLowerCase(),
            descritption: issueDesc.toLowerCase(),
            labels: [...labels],
            projectId: id
        })
        
        if(!newIssue) {
            req.flash('error', 'Invalid User Data');
            res.redirect('back');
        }

        // if all good redirect the page
        return res.redirect(`/App/v1/projects/projectDetails/${id}`);

    } catch(err) {
        console.log(err);
        req.flash('error', 'Something went wrong');
        return res.redirect('back');
    }
}

// GET - /searchIssue/:id
// public route
// gets the input and search the issues 
const searchIssue = async (req, res) => {
    try {
        //gets fields from req body
        const id = req.params.id
        const {searchIssue} = req.body;
        const {projectDetails} = req.cookies;
        
        //validates input
        if(!searchIssue.trim()) {
            req.flash('error', 'search fields should not be empty');
            return res.redirect('back');
        }

        // check project exists in db
        const proj = await PROJECT.findById(id);

        if(!proj) {
            req.flash('error', 'something went wrong');
            return res.redirect('/');
        }

        // searching the issues by title and description
        const issues = await ISSUES.find({
            $and: [
                {
                    $or:[{title: {$regex: searchIssue.toLowerCase()}}, {descritption: {$regex: searchIssue.toLowerCase()}}]
                },
                {
                    projectId: id
                }
            ]
        })

        return res.render('projectDetailsPage', {
            projectDetails: proj,
            issues,
            isIssues: issues.length < 1,
            totalIssues: projectDetails.totalIssues,
            labels: projectDetails.labels,
            authors: projectDetails.authors
        });
         
    } catch(err) {
        req.flash('error', 'Internal server error');
        return res.redirect('/');
    }
}

// GET - /filterIssue/:id
// public route
// gets the input and filters the issues
const filterIssue = async (req, res) => {
    try {
        //gets fields from the req body
        const id = req.params.id
        let {author, labels} = req.body;
        const {projectDetails} = req.cookies;

        if(!author.trim() && !labels.trim()) {
            req.flash('error', 'Internal server error');
            return res.redirect('back');
        }

        if(!labels || labels.length < 1) {
            labels = [];
        } else {
            labels = labels.split(',');
        }

   
        const proj = await PROJECT.findById(id);
        if(!proj) {
            throw new Error('Invlid User Data')
        }

        const issues = await ISSUES.find({
            $and: [
                {
                    $or:[{author: author}, { labels: {$in: labels}}]
                },
                {
                    projectId: id
                }
            ]
        })

        return res.render('projectDetailsPage', {
            projectDetails: proj,
            issues,
            isIssues: issues.length < 1,
            totalIssues: projectDetails.totalIssues,
            labels: projectDetails.labels,
            authors: projectDetails.authors
        });

    } catch(err) {
        req.flash('error', 'Internal server error');
        return res.redirect('/');
    }
}



module.exports = {
    //getAllIssuesByProjectID,
    getCreateIssue,
    postCreateIssue,
    searchIssue,
    filterIssue
}