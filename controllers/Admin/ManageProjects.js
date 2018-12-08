const Project = require('./../../models/Projects/Projects')
const User = require('./../../models/User/User')
module.exports = async (request, response) => {
    const projects = await Project.find({});
    const users = await User.find({});
    const renderingProjects = projects.filter((project) => {
        return project['project_details'].submittedBy == users.username
    })

    response.render('manageprojects', { renderingProjects })

}