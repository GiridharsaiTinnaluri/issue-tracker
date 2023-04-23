const mongoose = require('mongoose');
const { schema } = require('./issuesModel');

// project schema for mongodb document
const projectSchema = new mongoose.Schema({

    name:{ 
        type: String 
    },
    author:{ 
        type: String 
    },
    descritption:{ 
        type: String 
    }

}, {
    timestamps: true
})

//exporting the schema
module.exports = mongoose.model('Projects', projectSchema);
