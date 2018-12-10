const Form = require('./../../models/Forms/EligibilityForm')

module.exports = async (req, res) => {
    const model = {
        student_CMS_ID: req.body.cmsID,
        Form: {
            student_name: req.body.fullname,
            student_current_semester: req.body.currentsemester,
            student_courses_cleared: req.body.no_of_courses_cleared,
            student_current_CGPA: req.body.currentCGPA,
        }
    }
    Form.submitForm(model, (err, submittedForm) => {
        if (err) throw err;
        if (submittedForm !== null) {   
            res.status(200).send({
                formSubmitted: true
            })
        } else {
            res.status(401).send({
                formSubmitted: false
            })
        }
    })
}