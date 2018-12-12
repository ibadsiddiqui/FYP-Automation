const University_Projects = require('./../../models/Projects/UniversityProjects')
module.exports = async (request, response) => {
    if (request.method === "GET") {
        const Projects = await University_Projects.find({});
        response.render('fyplist', { Projects })

    } else {
        if (request.body.hasOwnProperty('project_name')) {

            const model = {
                project_name: request.body['project_name'],
                abstract: request.body['project_abstract']
            }
            await University_Projects.createProject(model, (err, projectSubmitted) => {
                if (err) throw err;
                if (projectSubmitted) {
                    response.render('index')
                }
            })
        }else {
            console.log(request.body['project_id'])
            University_Projects.findByIdAndDelete(request.body['project_id'],(err, deleted) =>{
                if(err) throw err;
                if(deleted){
                    console.log(deleted)
                    response.render('index')
                }else {
                    response.render('index')
                    
                }
            })

        }
    }
}