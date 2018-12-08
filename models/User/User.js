const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Automation');
const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = mongoose.Schema({
    _id: {
        type: String
    },
    name: {
        type: String
    },
    profession: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    hasSubmittedProposal: {
        type: Boolean,
        default: false
    },
    hasProposalBeenAccepted: {
        type: Boolean,
        default: false
    },
    hasSubmittedProgressReport: {
        type: Boolean,
        default: false
    },
    hasSubmittedFinalReport: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: String,
        default: new Date().toLocaleString()
    },
    blocked: {
        type: Boolean,
        default: false
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.registerUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                throw err;
            }
            newUser.password = hash;
            // newUser.save(callback);
            User.create(newUser, callback)
        });
    });
}

module.exports.getUserByUsername = function (username, callback) {
    const query = { username: username }
    User.findOne(query, callback);
}

module.exports.getUserByProfession = function (profession, callback) {
    const query = { profession: profession };
    User.find(query, callback);
}

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}


//use by General
module.exports.checkProposalSubmissionStatus = function (id, callback) {
    User.findById(id, callback)
}


// use by user
module.exports.updateProposalSubmission = function (id, submit, callback) {
    User.findById(id, (err, user) => {
        if (err) throw (err);

        user.set({ hasSubmittedProposal: submit });
        user.save(callback);
    });
}

// use  by admin
module.exports.updateProposalAcceptanceStatus = function (id, acceptOrNot, callback) {
    User.findById(id, (err, user) => {
        if (err) throw (err);

        user.set({ hasProposalBeenAccepted: acceptOrNot });
        user.save(callback);
    });
}

// use by user
module.exports.updateProgressReportStatus = function (id, submit, callback) {
    User.findById(id, (err, user) => {
        if (err) throw (err);
        user.set({ hasSubmittedProgressReport: submit });
        user.save(callback);
    });
}


// use by user
module.exports.updateSubmittedFinalReportStatus = function (id, submit, callback) {
    User.findById(id, (err, user) => {
        if (err) throw (err);
        user.set({ hasSubmittedFinalReport: submit });
        user.save(callback);
    });
}

module.exports.toggleUserBlocking = function (id, submit, callback) {
    User.findById(id, (err, user) => {
        if (err) throw (err);
        user.set({ blocked: submit });
        user.save(callback);
    });
}