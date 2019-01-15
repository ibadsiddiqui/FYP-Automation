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
                await Request.acceptProposalRequest( user.name.toLowerCase(), student_name, async (err, status) => {
                    if (err) throw err;
                    if (status.ok) {
                        await User.findOne({ name: student_name }, (err, student) => {
                            if (err) throw err;
                            if (student) {
                                student.hasProposalBeenAcceptedBySupervisor = true
                                student.save((err, saved) => {
                                    if (err) throw err;
                                    if (saved) {
                                        res.status(200).send('success')
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }

}