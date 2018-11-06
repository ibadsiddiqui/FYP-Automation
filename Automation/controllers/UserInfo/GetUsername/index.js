const User = require('./../../../models/User/User')

module.exports = (request, response) => {
    const username = request.body.username;
    console.log(request.body.username, request.body.password )

    
    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (user !== null) {
            isRegistered = true
        } else {
            isRegistered = false;
        }
        response.send({ response: isRegistered })

    })
}