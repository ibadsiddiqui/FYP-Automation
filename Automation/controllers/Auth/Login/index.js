const User = require('./../../../models/User/User')


module.exports = (request, response) => {
    const username = request.body.username;
    const password = request.body.password;


    var isRegistered;
    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (user !== null) {
            isRegistered = true
        } else {
            isRegistered = false;
        }

        console.log(isRegistered)

        if (isRegistered == true) {

            User.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    response.send({
                        message: "Password Matched",
                        auth: true
                    })
                } else {
                    response.send({
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