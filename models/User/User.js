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
    createdAt:{
        type: String,
        default: new Date().toLocaleString()
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.registerUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                console.log(err);
            }
            newUser.password = hash;
            // newUser.save(callback);
            User.create(newUser, callback)
        });
    });
}

module.exports.getUserByUsername = function (username, callback) {
    const query = { username: username }
    User.findOne(query,callback);
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