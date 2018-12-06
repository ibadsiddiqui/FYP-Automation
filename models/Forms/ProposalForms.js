const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Automation');

// Project Schema
const ProjectProposalSchema = mongoose.Schema({
    program_of_study: {
        type: String
    },
    project_name: {
        type: String
    },
    student_details: {
        student_CMS_ID: {
            type: String
        },
        student_year_session: {
            type: String
        },
        student_enrollment_year: {
            type: String
        },
    },
    supervisorDetails: {
        supervisor_details: {
            fullname: {
                type: String
            },
            designation: {
                type: String
            }
        },
        co_supervisor_details: {
            fullname: {
                type: String
            },
            designation: {
                type: String
            }
        },
        external_supervisor: {
            fullname: {
                type: String
            },
            designation: {
                type: String
            }
        },
    },
    proposal_submitted_At: {
        type: String,
        default: new Date().toLocaleString()
    }
});

const ProjectProposal = module.exports = mongoose.model('ProjectProposal', ProjectProposalSchema);

module.exports.submitProposal = function (newProposal, callback) {
    ProjectProposal.create(newProposal, callback)
}

module.exports.getAllProposals = function (callback) {
    ProjectProposal.find({}, callback);
}

// module.exports.getProposalBySessions = function (callback) {
//     ProjectProposal.find({}, callback);
// }


// module.exports.getProposalByProgramOfStudy = function (callback) {
//     ProjectProposal.find({}, callback);
// }
