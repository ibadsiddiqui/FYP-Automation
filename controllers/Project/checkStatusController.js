const User = require('../../models/User/User')
const decodedJWT = require('../../Helpers/JWTDecoder')

module.exports = async (request, response) => {
    const username = decodedJWT(request.headers.authorization)

    if (username) {
        await User.checkProposalSubmissionStatus(username, (err, user) => {
            if (err) throw err;
            if (user !== null) {
                if (user.hasSubmittedProposal) {
                    response.status(200).send({
                        hasSubmittedProposal: user.hasSubmittedProposal,
                        hasProposalBeenAccepted: user.hasProposalBeenAccepted,
                        hasSubmittedProgressReport: user.hasSubmittedProgressReport,
                        hasSubmittedFinalReport: user.hasSubmittedFinalReport,
                        hasProposalBeenAcceptedBySupervisor: user.hasProposalBeenAcceptedBySupervisor
                    })
                }
                else if (!user.hasSubmittedProposal) {
                    response.status(200).send({
                        hasSubmittedProposal: user.hasSubmittedProposal,
                        hasProposalBeenAccepted: user.hasProposalBeenAccepted,
                        hasSubmittedProgressReport: user.hasSubmittedProgressReport,
                        hasSubmittedFinalReport: user.hasSubmittedFinalReport,
                        hasProposalBeenAcceptedBySupervisor: user.hasProposalBeenAcceptedBySupervisor
                    })
                }
            } else {
                response.status(404).send({ proposalSubmitted: null })
            }
        })

    }
}