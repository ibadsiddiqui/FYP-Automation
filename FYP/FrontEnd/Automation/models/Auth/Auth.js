const mongoose = require('mongoose');

const UserDetails = mongoose.Schema({
    username: String,
    id: String,
    email: String,
    password: String,
});

var User = mongoose.model('User', UserDetails);
module.exports =User;