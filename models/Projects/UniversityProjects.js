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
    project_submitted_at: {
        type: String,
        default: new Date().toLocaleString()
    }
});

const University_Projects = module.exports = mongoose.model('University_Projects', ProjectSchema);

module.exports.createProject = function (project, callback) {
    University_Projects.create(project, callback);
}

module.exports.getAllProjectsByUniversity = function (callback) {
    University_Projects.find({}, callback);
}
