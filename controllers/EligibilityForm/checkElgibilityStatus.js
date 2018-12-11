const Form = require('../../models/Forms/EligibilityForm')

module.exports = async (req, res) => {
    Form.checkStatus(req.body.cms_id, (err, form) => {
        if (err) throw err;
        if (form !== null) {
            if (form.status === 'accepted') {
                res.send({ accepted: true, status: 'accepted' })
            } else if (form.status === 'rejected') {
                res.send({ accepted: false, status: 'rejected' })

            } else {
                res.send({ status: 'pending' })
            }
        }
    })
}