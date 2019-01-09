const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Automation');

// Project Schema
const MeetingMinute = mongoose.Schema({
    _id: {
        type: String
    },
    Meetings:{
        type: Array
    }
});

const MeetingMinutes = module.exports = mongoose.model('Meeting_Minutes', MeetingMinute);

module.exports.createMeeting = function (meeting, callback) {
    MeetingMinutes.create(meeting, callback)
}

module.exports.getMeetingList = function ( userID, callback) {
    const query = { _id: userID }
    MeetingMinutes.findById(query, callback);
}