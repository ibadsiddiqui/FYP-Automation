const Users = require('./../../models/User/User')
const decodedJWT = require('./../../Helpers/JWTDecoder')

module.exports = async (req, res) => {


    if (req.headers.authorization) {
        const username = decodedJWT(req.headers.authorization)
        if (username) {

            await Users.getUserByProfession("teacher", (err, teachers) => {
                if (err) throw err;
                if (teachers !== null) {
                    res.sendStatus(200).send(teachers)
                } else {
                    res.sendStatus(200).send('none')
                }
            })
        }
    } else {
        res.sendStatus(401).status('Please try logging in again')
    }
}