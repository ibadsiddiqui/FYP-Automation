const Project = require('./../../models/Projects/Projects')
module.exports = async (request, response) => {
    const Projects = await Project.find({});
    response.render('fyplist', {Projects})
}