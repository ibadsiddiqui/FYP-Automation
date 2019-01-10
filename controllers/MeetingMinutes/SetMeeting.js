const User = require('./../../models/User/User')
const MeetingMinutes = require('./../../models/MeetingMinutes')
const decodedJWT = require('../../Helpers/JWTDecoder')

module.exports = async (req, res) => {

    const username = decodedJWT(req.headers.authorization)

    const model = {
        meetingNumber: req.body.meetingNumber,
        meetingTopic: req.body.meetingTopic,
        meetingWith: req.body.meetingWith,
        meetingDate: req.body.meetingDate,
    }
    if (username) {

        await User.getUserById(username, async (err, user) => {
            if (err) throw err;
            if (user !== null) {

                MeetingMinutes.getMeetingList(username, (err, details) => {
                    if (err) throw err;
                    if (details !== null) {

                        details.Meetings.push(model);
                        details.save();
                        res.status(200).send({state: true})

                    } else if (details === null || details === undefined) {

                        const meetingModel = {
                            _id: username,
                            Meetings: [model]
                        }

                        MeetingMinutes.createMeeting(meetingModel, (err, newMeeting) => {
                            if (err) throw err;
                            if (!newMeeting) {
                                res.status(200).send({state: true})
                            }
                        })
                    }
                })
            }

        })

    }
}