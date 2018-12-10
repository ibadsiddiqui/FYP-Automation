const User = require('./../../../models/User/User')
const decodedJWT = require('./../../../Helpers/JWTDecoder')

module.exports = (request, response) => {
    if (request.method === "POST") {
        const username = request.body.username;
        User.getUserByUsername(username, (err, user) => {
            if (err) throw err;
            if (user !== null) {
                response.status(200).send({ response: true, user })

            } else {
                response.status(404).send({ response: false })
            }
        })
    }
    if (request.method === 'GET') {
        const username = decodedJWT(request.headers.authorization)

        if (username) {
            // const username = request.body.username;
            User.getUserByUsername(username, (err, user) => {
                if (err) throw err;
                if (user !== null) {
                    response.status(200).send({ response: true, user })

                } else {
                    response.status(404).send({ response: false })
                }
            })

        }

    }
}