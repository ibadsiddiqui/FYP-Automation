const Project = require('./../../models/Projects/Projects')

module.exports = async (req, res) => {
    const name = req.body.pname;
    const groupid = req.body.groupid;
    const status = req.body.status;
    const abstract = req.body.abstract;
    const createdAt = new Date().toLocaleString();
    const completedAt = req.body.completedAt;
    const newProject = new Project({
        project_name: name,
        group_id: groupid,
        status: status,
        abstract: abstract,
        createdAt: createdAt,
        completedAt: completedAt
    })
    Project.create(newProject, (err, project) => {
        if (err) throw err;
        console.log('New Project', project)
    })
}