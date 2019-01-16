const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Automation');

// Project Schema
const ProjectSchema = mongoose.Schema({
    project_details: {
        project_name: {
            type: String
        },
        problem_statement: {
            type: String
        },
        motivation: {
            type: String
        },
        objective: {
            type: String
        },
        abstract: {
            type: String
        },
        literature_review: {
            type: String
        },
        scope: {
            type: String
        },
        methodology: {
            type: String
        },
        raci_chart: {
            type: String
        },
        usecase_diagram: {
            type: String
        },
        statusReport: {
            type: String,
            default: ''
        },
        finalReport: {
            type: String,
            default: ''

        }
    },
    submittedBy: {
        type: String,
        default: ''
    },
    marks: {
        type: Number,
        default: 0
    },
    project_submitted_at: {
        type: String,
        default: new Date().toLocaleString()
    }
});

const Project = module.exports = mongoose.model('Project', ProjectSchema);

module.exports.createProject = function (project, callback) {
    Project.create(project, callback);
}

module.exports.updateSubmissionOfFinalReport = function (userID, submit, callback) {
    const query = { submittedBy: userID };

    Project.findOne(query, (err, project) => {
        if (err) throw (err);
        project.set({
            project_details: {
                finalReport: submit
            }
        });
        project.save(callback);
    });
}


module.exports.getAllProjects = function (callback) {
    Project.find({}, callback);

}
module.exports.updateSubmissionOfProgressReport = function (userID, submit, callback) {
    const query = { submittedBy: userID }
    Project.findOne(query, (err, project) => {
        if (err) throw (err);
        project.set({
            project_details: {
                statusReport: submit
            }
        });
        project.save(callback);
    });
}

module.exports.getUserByProject = function (project, callback) {
    const query = { project: project }
    Project.findOne(query, callback);
}

module.exports.getProjectById = function (project_id, callback) {
    Project.findById(project_id, callback);
}

module.exports.updateMarks = function (_id, marks,callback) {
    const query = { _id: _id }
    Project.findOne(query, (err, project) => {
        if (err) throw err;
        if (project) {
            project.marks = marks
            project.save(callback)
        }
    })
}