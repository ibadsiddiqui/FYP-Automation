const Project = require('./../../models/Projects/Projects')
const User = require('./../../models/User/User')
const decodedJWT = require('./../../Helpers/JWTDecoder')

module.exports = async (req, res) => {
    const username = decodedJWT(req.headers.authorization);
    const progressReport = req.body.progressReport;
    console.log(req.body)
    User.getUserById(username, async (err, user) => {
        if (err) throw err;
        if (user !== null) {
            await User.updateProgressReportStatus(username, true, (err, user) => {
                if(err) throw err;
                if(user.hasSubmittedProgressReport) {
                    Project.updateSubmissionOfProgressReport(user.username, progressReport, (err, updatedReport) => {
                        if(err) throw err;
                        if(updatedReport !== null){
                            console.log(updatedReport)
                            res.status(200).send({redirect: true})
                        }
                    })
                }
            })
        }
    })

    
}