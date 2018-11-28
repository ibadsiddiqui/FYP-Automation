const Project = require('./../../models/Projects/Projects')

module.exports = async (request, response) => {
    const projects = await Project.find({});
    response.render('manageprojects', {projects})

}