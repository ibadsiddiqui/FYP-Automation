const User = require('./../../../models/User/User')
const decodedJWT = require('./../../../Helpers/JWTDecoder')

module.exports = (request, response) => {
    
    const JWTusername = decodedJWT(request.headers.authorization)

    const name = request.body.name;
    const email = request.body.email;

    if (JWTusername) {
        User.getUserByUsername(JWTusername, (err, user) => {
            if (err) throw err;
            if (user !== null) {
                user.name = name;
                user.email = email
                user.save((err, updatedUser) => {
                    if (err) return err;
                    response.status(200).send({ response: true, updatedUser })
                })
            } else {
                response.status(404).send({ response: false })
            }

        })

    }
}