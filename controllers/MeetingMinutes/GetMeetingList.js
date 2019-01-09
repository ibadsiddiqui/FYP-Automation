const MeetingMinutes = require('./../../models/MeetingMinutes')
const decodedJWT = require('../../Helpers/JWTDecoder')

module.exports = async (req, res) => {

    const username = decodedJWT(req.headers.authorization)

    if(username){
        const list = await MeetingMinutes.getMeetingList(username)
        if(!list){
            res.status(200).send({list: []})
        }else {
            res.status(200).send({list: list})

        }
    }

}