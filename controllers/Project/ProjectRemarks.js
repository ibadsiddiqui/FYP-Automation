const Projects = require('./../../models/Projects/Projects');
const Users = require('./../../models/User/User');

module.exports = async (req, res) => {
    if (req.method === "GET") {

        const FYPList = await Projects.find({});
        res.render('remarks', { FYPList })

    } else {
        if (parseInt(req.body.marks) <= 200) {

            await Projects.updateMarks(req.body.project_id, req.body.marks, async (err, update) => {
                if (err) throw err;
                if (update) {
                    const FYPList = await Projects.find({});
                    res.render('remarks', { FYPList })
                }
            })
        } else {
            const FYPList = await Projects.find({});
            res.render('remarks', { FYPList })
        }
    }

}