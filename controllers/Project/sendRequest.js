const RequestModel = require('../../models/User/ProposalRequest');


module.exports = async (req, res) => {
    const username = req.body.supervisorName

    if (username) {
        const model = {
            "student_id" : req.body.student_id,
            "project_name": req.body.project_name,
            "project_abstract": req.body.project_abstract,
            "student_name" : req.body.student_name
        } 

        await RequestModel.sendProposalRequest(username, model, (err, requests) => {
            if(err) throw err;
            if(requests) {
                res.status(200).send('success')
            }
        })
    }
}