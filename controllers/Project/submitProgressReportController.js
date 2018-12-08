const Project = require('./../../models/Projects/Projects')
const User = require('./../../models/User/User')
const decodedJWT = require('./../../Helpers/JWTDecoder')

module.exports = async (req, res) => {
    const username = decodedJWT(req.headers.authorization);
    const progressReport = req.body.progressReport;
    User.getUserById(username, async (err, user) => {
        if (err) throw err;
        if (user !== null) {
            await User.updateProgressReportStatus(username, true, async (err, user) => {
                if(err) throw err;
                if(user.hasSubmittedProgressReport) {
                    await Project.updateSubmissionOfProgressReport(user.username, progressReport, (err, updatedReport) => {
                        if(err) throw err;
                        if(updatedReport !== null){
                            res.status(200).send({redirect: true})
                        }
                    })
                }
            })
        }
    })

    
}