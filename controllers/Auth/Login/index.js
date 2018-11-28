var jwt = require('jsonwebtoken');
var config = require('./../../Secret')
const User = require('./../../../models/User/User')


module.exports = (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (user !== null) {
            User.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    var token = jwt.sign({ id: user._id }, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    response.status(200).send({
                        auth: true,
                        token: token,
                    });
                } else {
                    response.status(500).send({
                        message: "Wrong Password",
                        auth: false,
                    })
                }
            })
        } else {
            response.send({
                message: 'Not registered',
                auth: false
            })
        }
    });
}