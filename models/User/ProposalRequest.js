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
