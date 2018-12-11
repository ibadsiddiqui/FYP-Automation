const Project = require('./../../models/Projects/Projects')
const Proposals = require('./../../models/Forms/ProposalForms')
const User = require('./../../models/User/User')
module.exports = async (request, response) => {

    if (request.method === "GET") {
        const projects = await Project.find({});
        const users = await User.find({});
        const renderingProjects = projects.filter((project) => {
            return project['project_details'].submittedBy == users.username
        })
        response.render('manageprojects', { renderingProjects, users })
    } else {

        const username = request.body['id'];
        const status = request.body['status'];

        if (status === 'Accept') {
            await User.updateProposalAcceptanceStatus(username, true, (err, updatedStatus) => {
                if (err) throw err;
                if (updatedStatus !== null) {
                    response.render('index')
                }
            })
        } else {
            console.log('Project Deleting')
            // await Project.findOneAndDelete({submittedBy: username})
            console.log(username)
            const query = {"student_details.student_CMS_ID": username}

            console.log('Proposal deleting')
            await Proposals.findOneAndRemove(query)

            // console.log('Updating Proposal submission')
            await User.updateProposalSubmission(username, false, (err, updatedStatus) => {
                if(err) throw err;
                if(updatedStatus !==null){
                console.log('deleted')

                    response.render('index')
                }
            })
        }
    }

}