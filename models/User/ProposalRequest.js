const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Automation');
const bcrypt = require('bcryptjs');

// User Schema
const ProposalRequest = mongoose.Schema({

    supervisorName: {
        type: String
    },
    request_from: {
        type: Array
    }

});

const ProposalRequests = module.exports = mongoose.model('ProposalRequests', ProposalRequest);


module.exports.getProposalRequest = function (id, callback) {
    const query = { supervisorName: id }
    ProposalRequests.findOne(query, callback);
}

module.exports.acceptProposalRequest = function (id, student_name, callback) {
    const query = { supervisorName: id }
    ProposalRequests.findOne(query, async (err, requestReceived) => {
        if (err) throw (err);
        if (requestReceived) {

            await ProposalRequests.updateOne({
                _id: requestReceived._id,
                request_from: { $elemMatch: { student_name: student_name } }
            }, {
                    $set: {
                        "request_from.$.accepted": true
                    }
                },
            callback)
        }
    });
}


module.exports.sendProposalRequest = function (id, model, callback) {
    const query = { supervisorName: id }

    ProposalRequests.findOne(query, (err, request) => {
        if (err) throw (err);
        if (request) {

            request.request_from.push(model);
            request.save(callback);
        } else if (!request) {
            ProposalRequests.create({ supervisorName: id, request_from: model }, callback)
        }
    });
}
