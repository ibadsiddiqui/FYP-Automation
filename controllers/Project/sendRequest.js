const RequestModel = require('../../models/User/ProposalRequest');
const decodedJWT = require('../../Helpers/JWTDecoder')


module.exports = async (req, res) => {
    const username = req.body.supervisorName

    if (username) {
        const model = {
            "student_id": decodedJWT(req.body.student_id),
            "project_name": req.body.project_name,
            "project_abstract": req.body.project_abstract,
            // "student_name": req.body.student_name,
            "accepted": false
        }

        await RequestModel.sendProposalRequest(username, model, (err, requests) => {
            if (err) throw err;
            if (requests) {
                res.status(200).send('success')
            }else {
                res.status(500).send('internal server error')
            }
        })
    }
}