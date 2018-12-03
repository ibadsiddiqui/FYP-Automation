const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Automation');

// Project Schema
const ProjectSchema = mongoose.Schema({
    project_name: {
        type: String
    },
    abstract: {
        type: String
    },
    student_CMS_ID: {
        type: String
    },
    status: {
        type: String
    },
    finalReport: {
        type: String
    },
    progressReport: {
        type: String
    },
    createdAt:{
        type: String,
        default: new Date().toLocaleString()
    },
    completedAt:{
        type: String,
    }
});

const Project = module.exports = mongoose.model('Project', ProjectSchema);

module.exports.getUserByProject = function (project, callback) {
    const query = { project: project }
    Project.findOne(query,callback);
}

module.exports.getProjectById = function (project_id, callback) {
    Project.findById(project_id, callback);
}   

