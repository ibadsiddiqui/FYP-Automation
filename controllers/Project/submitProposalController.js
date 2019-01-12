const User = require('./../../models/User/User')
const ProposalForm = require('./../../models/Forms/ProposalForms')
const Projects = require('./../../models/Projects/Projects')
const decodedJWT = require('./../../Helpers/JWTDecoder')

module.exports = async (req, res) => {
    const username = decodedJWT(req.headers.authorization)

    const program_of_study = req.body.program_of_study;
    const project_name = req.body.project_name;
    const student_year_session = req.body.student_year_session;
    const student_enrollment_year = req.body.student_enrollment_year;
    const student_CMS_ID = username;
    const supervisor_fullname = req.body.supervisor_fullname;
    const supervisor_designation = req.body.supervisor_designation;
    const co_supervisor_fullname = req.body.co_supervisor_fullname
    const co_supervisor_designation = req.body.co_supervisor_designation;
    const external_supervisor_fullname = req.body.external_supervisor_fullname;
    const external_supervisor_designation = req.body.external_supervisor_designation

    const abstract = req.body.abstract;
    const problem_statement = req.body.problem_statement;
    const motivation = req.body.motivation;
    const objective = req.body.objective;
    const literature_review = req.body.literature_review;
    const scope = req.body.scope;
    const methodology = req.body.methodology;
    const raciChart = req.body.raciChart
    const useCaseDiagram = req.body.useCaseDiagram
    User.getUserById(username, async (err, user) => {
        if (err) throw err;
        if (user !== null) {
            await User.updateProposalSubmission(username, true, () => { });

            ProposalData = {
                program_of_study: program_of_study,
                project_name: project_name,
                student_details: {
                    student_CMS_ID: student_CMS_ID,
                    student_year_session: student_year_session,
                    student_enrollment_year: student_enrollment_year,
                },
                supervisorDetails: {
                    supervisor_details: {
                        fullname: supervisor_fullname,
                        designation: supervisor_designation
                    },
                    co_supervisor_details: {
                        fullname: co_supervisor_fullname,
                        designation: co_supervisor_designation
                    },
                    external_supervisor: {
                        fullname: external_supervisor_fullname,
                        designation: external_supervisor_designation
                    },
                },
                proposal_submitted_At: new Date().toLocaleString()
            }
            await ProposalForm.submitProposal(ProposalData, (err, success) => {

                if (err) throw err;
                if (success !== null) {
                    // console.log("success")
                }
            });

            ProjectSchema = {
                project_details: {
                    project_name: project_name,
                    problem_statement: problem_statement,
                    motivation: motivation,
                    objective: objective,
                    abstract: abstract,
                    literature_review: literature_review,
                    scope: scope,
                    methodology: methodology,
                    raci_chart: raciChart,
                    usecase_diagram: useCaseDiagram,
                },
                submittedBy: user.username,
                project_submitted_at: new Date().toLocaleString()
            };

            await Projects.createProject(ProjectSchema, (err, submitted) => {
                if (err) throw err
                else if (submitted !== null)
                    res.status(200).send({ status: 'submitted' })
                else
                    res.send({ status: 'unknown' })

            })
        }
    })
}