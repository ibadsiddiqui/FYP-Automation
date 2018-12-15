var jwt = require('jsonwebtoken');
var config = require('./../../Secret')

const User = require('./../../../models/User/User')

module.exports = async (request, response) => {
    const name = request.body.name;
    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;
    const profession = request.body.profession.toLowerCase();


    await User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (user === null) {
            const newUser = new User({
                _id: username,
                name: name,
                profession: profession,
                username: username,
                email: email,
                password: password,
            });

            User.registerUser(newUser, (err, user) => {
                if (err)
                    response.send({ registration: "Error in creating new user. Please try again" })
                var token = jwt.sign({ id: user._id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                response.status(200).send({ registration: true, token: token });
            })
        } else {
            response.send({ registration: false })
        }

    });

}  