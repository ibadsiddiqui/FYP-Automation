const User = require('./../../models/User/User')
const decodedJWT = require('./../../Helpers/JWTDecoder')

module.exports = (request, response) => {
    const username = decodedJWT(request.headers.authorization) 

    if (username){
        User.getUserByUsername( username, (err, user) => {
            if (err) throw err;
            if (user !== null) {
                if(user.hasSubmittedProposal){
                    
                    response.status(200).send({ proposalSubmitted: true })
                }
                else{
                    response.status(200).send({ proposalSubmitted: false })
                }
            } else {
                response.status(404).send({ proposalSubmitted: null })
            }
        })

    }
}