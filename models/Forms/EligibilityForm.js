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
    status: {
        type: String,
        default: 'pending',
    },
    submittedAt: {
        type: String,
        default: new Date().toLocaleString()

    }
});

const EligibilityForm = module.exports = mongoose.model('EligibilityForm', EligibilityFormSchema);

module.exports.submitForm = function (newForm, callback) {
    EligibilityForm.create(newForm, callback)
}

module.exports.getAllForms = function (callback) {
    EligibilityForm.find({}, callback);
}

module.exports.toggleStatus = function (formId, status, callback) {
    EligibilityForm.findById(formId, (err, form) => {
        if (err) throw (err);
        if(form !== null){
            form.set({ status: status });
            form.save(callback);
        }
    });

}
