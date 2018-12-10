const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Automation');

// Project Schema
const EligibilityFormSchema = mongoose.Schema({
    Form: {

        student_name: {
            type: String
        },
        student_CMS_ID: {
            type: String
        },
        student_current_semester: {
            type: String
        },
        student_courses_cleared: {
            type: String
        },
        student_current_CGPA: {
            type: String
        },
    },
});

const EligibilityForm = module.exports = mongoose.model('EligibilityForm', EligibilityFormSchema);

module.exports.submitProposal = function (newForm, callback) {
    EligibilityForm.create(newProposal, callback)
}

module.exports.getAllProposals = function (callback) {
    EligibilityForm.find({}, callback);
}
