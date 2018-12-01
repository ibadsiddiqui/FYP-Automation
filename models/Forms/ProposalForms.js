const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Automation');

// Project Schema
const ProjectProposalSchema = mongoose.Schema({
    program_of_study: {
        type: String
    },
    student_details: {
        student_fullname: {
            type: String
        },
        student_year_session: {
            type: String
        },
        student_enrollment_year: {
            type: String
        },
    },
    project_details:{
        project_name: {
            type: String
        },
        problem_statement:{
            type: String
        },
        motivation:{
            type: String
        },
        objective:{
            type: String
        },
        literature_review:{
            type: String
        },
        scope:{
            type: String
        },
        methodology:{
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
    proposal_submitted_At:{
        type: String,
        default: new Date().toLocaleString()
    }
});

const ProjectProposal = module.exports = mongoose.model('ProjectProposal', ProjectProposalSchema);

module.exports.getAllProposals = function ( callback) {
    ProjectProposal.find({},callback);
}


