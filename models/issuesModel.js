const mongoose = require('mongoose');

// project schema for mongodb document
const issuesSchema = new mongoose.Schema({

    title:{ 
        type: String 
    },
    author:{
        type: String 
    },
    descritption:{ 
        type: String 
    },
    labels: {
        type: [String]
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects'
    }

}, {
    timestamps: true
})

// exporting the schema
module.exports = mongoose.model('Issues', issuesSchema);
