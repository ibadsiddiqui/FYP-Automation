const decodedJWT = require('../../Helpers/JWTDecoder');
const User = require('../../models/User/User');
const Request = require('./../../models/User/ProposalRequest');

module.exports = async (req, res) => {
    const username = decodedJWT(req.headers.authorization)
    const student_name = req.body.student_name

    if (username) {
        await User.getUserByUsername(username, async (err, user) => {
            if (err) throw err;
            if (user) {
                await Request.acceptProposalRequest(user.name.toLowerCase(), student_name, (err, status) => {
                    if (err) throw err;
                    if (status) {
                        res.status(200).send({ status: status.ok })
                    }
                })
            }
        })
    }
}