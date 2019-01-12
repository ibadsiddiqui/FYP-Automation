const RequestModel = require('../../models/User/ProposalRequest');
const decodedJWT = require('./../../Helpers/JWTDecoder')
const User = require('./../../models/User/User')
module.exports = async (req, res) => {
    const username = decodedJWT(req.headers.authorization)
    if (username) {
        await User.getUserByUsername(username, async (err, user) => {
            console.log(user)
            if (err) throw err;
            if (user) {

                await RequestModel.getProposalRequest(res.name, (err, requests) => {
                    if (err) throw err;
                    if (requests) {
                        res.status(200).send(requests)
                    }
                    if (!requests) {
                        res.status(200).send(false)
                    }
                })
            }
        })
    }
}