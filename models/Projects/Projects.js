const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Automation');
const bcrypt = require('bcryptjs');

// Project Schema
const ProjectSchema = mongoose.Schema({
    project_name: {
        type: String
    },
    group_id: {
        type: String
    },
    status: {
        type: String
    },
    abstract: {
        type: String
    },
    createdAt:{
        type: String,
        default: new Date().toLocaleString()
    },
    completedAt:{
        type: String,
        // default: new Date().toLocaleString()
    }
});

const Project = module.exports = mongoose.model('Project', ProjectSchema);

module.exports.getUserByProject = function (project, callback) {
    const query = { project: username }
    Project.findOne(project,callback);
}

module.exports.getProjectById = function (project_id, callback) {
    Project.findById(project_id, callback);
}   

