const Projects = require('./../../models/Projects/Projects')

module.exports = (req,res) => {
    console.log("here")
    Projects.getAllProjects((err, allProjects) => {
        if(err) throw err;
        if(allProjects !== null){
            res.status(200).send(allProjects)
        }
    })
}