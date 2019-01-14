const decodedJWT = require('../../Helpers/JWTDecoder');
const User = require('../../models/User/User');

const Meetings = require('./../../models/MeetingMinutes')

module.exports = async (req, res) => {
    const username = decodedJWT(req.headers.authorization)


    if (username) {
        await User.getUserByUsername(username, async (err, user) => {
            if (err) throw err;
            if (user) {
                await Meetings.find({}, (err, requests) => {
                    if (err) throw err;
                    if (requests) {
                        const StudentMeeting = requests.map((MeetingRequest) => {
                            return (MeetingRequest.Meetings.filter((item) => {
                                return item.meetingWith.toLowerCase() === user.name.toLowerCase()
                            }))
                        })
                         res.status(200).send(StudentMeeting[0])
                    }
                    if (!requests) {

                        res.status(200).send(false)
                    }
                })
            }
        })
    }
}