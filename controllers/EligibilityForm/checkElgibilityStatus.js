const Form = require('../../models/Forms/EligibilityForm')

module.exports = async (req, res) => {
    if (req.body.cms_id !== '') {

        await Form.checkStatus(req.body.cms_id, (err, form) => {
            if (err) throw err;
            if (form !== null) {
                if (form.status === 'accepted') {
                    res.status(200).send({ accepted: true, status: 'accepted' })
                } else if (form.status === 'rejected') {
                    res.status(200).send({ accepted: false, status: 'rejected' })

                } else {
                    res.status(200).send({ status: 'pending' })
                }
            } else {
                res.status(200).send({accepted: false,status: 'rejected'})
            }

        })
    } else {
        res.status(500).send({status: "failed"})
    }
}