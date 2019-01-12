const Users = require('./../../models/User/User')
const decodedJWT = require('./../../Helpers/JWTDecoder')

module.exports = async (req, res) => {
    const username = decodedJWT(req.headers.authorization)

    if (username) {

        await Users.getUserByProfession("teacher", (err, teachers) => {
            if (err) throw err;
            if (teachers !== null) {
                res.send(teachers)
            } else {
                res.send('none')
            }
        })
    }
}