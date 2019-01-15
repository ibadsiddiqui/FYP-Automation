const path = require('path')

const mongoose = require('mongoose');
const expressEdge = require('express-edge');

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
mongoose.connect('mongodb://localhost/Automation');
const port = process.env.PORT || 4000;

// template engine for admin and directory 
app.use(express.static('public'))
app.use(expressEdge);

// allow to accept and transfer data in json
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// setting views directory for Admin pages
app.set('views', `${__dirname}/views`);

// ////////////////////////////////////////admin works


const adminDashboard = require('./controllers/Admin/Dashboard')
const adminManageEligibilities = require('./controllers/Admin/ManageEligibilities')
const adminManageUsers = require('./controllers/Admin/ManageUsers');
const adminManageProjects = require('./controllers/Admin/ManageProjects')
const adminManageFYPList = require('./controllers/Admin/adminManageFYPList')
const AdmintoogleEligibilities = require('./controllers/Admin/AdmintoggleEligibilities')
app.get('/',  adminDashboard)
app.get('/manageusers', adminManageUsers)
app.post('/manageusers', adminManageUsers)
app.get('/fyplist', adminManageFYPList)
app.post('/fyplist', adminManageFYPList)
app.get('/manageeligibilities', adminManageEligibilities)
app.post('/toggleeligibility', AdmintoogleEligibilities)
app.get('/manageprojects', adminManageProjects)
app.post('/manageprojects', adminManageProjects)
////////////////////////////////////////////////////////

const eligibilityFormSubmission = require('./controllers/EligibilityForm/submitEligibilityForm');
const checkElgibilityStatus = require('./controllers/EligibilityForm/checkElgibilityStatus')
app.post('/submiteligibilityform', eligibilityFormSubmission)
app.post('/checkElgibilityStatus', checkElgibilityStatus)




/////////////////////////////////////////////////////

// user authentication work
const LoginAuthController = require('./controllers/Auth/Login')
const RegisterAuthController = require('./controllers/Auth/Register')

app.post('/login', LoginAuthController);
app.post('/register', RegisterAuthController);
////////////////////////////////////////////////


// for auth and profile getting info using 
const GetUsernameAuthController = require('./controllers/UserInfo/GetDetails')
app.post('/getusername', GetUsernameAuthController)
app.get('/getuserinfo', GetUsernameAuthController)
///////////////////////////////////////////////////////

// all user controllers for updating profile
const UpdateUserProfileController = require('./controllers/UserInfo/UpdateUserProfileController')
app.post('/updateuserprofile', UpdateUserProfileController)
/////////////////////////////////////////////////////

// project request controllers
// students
const checkProjectSubmissionStatus = require('./controllers/Project/checkStatusController')
const submitProjectController = require('./controllers/Project/submitProposalController')
const submitProgressController = require('./controllers/Project/submitProgressReportController')
const submitFinalReportController = require('./controllers/Project/submitFinalReportController')
const fetchAllProjects = require('./controllers/Project/ListOfProjectController')
const getTeachersList = require('./controllers/Teachers/GetTeachersList') 
const sendRequest = require('./controllers/Project/sendRequest')

app.get('/checkStatus', checkProjectSubmissionStatus)
app.post('/submitProposal', submitProjectController)
app.post('/submitProgressReport', submitProgressController)
app.post('/submitFinalReport', submitFinalReportController)
app.get('/getAllProject', fetchAllProjects)
app.get('/getTeachersList', getTeachersList)
app.post('/sendRequest', sendRequest)

// teachers 
const getMeetingList = require('./controllers/MeetingMinutes/GetMeetingList')
const setMeeting = require('./controllers/MeetingMinutes/SetMeeting')
const getRequestList = require('./controllers/Project/getRequestList')
app.get('/getRequestList', getRequestList)

app.get('/getMeetingList', getMeetingList)
app.post('/setMeeting', setMeeting)

//////////////////////////////////////////////////////////


// process for development
if (process.env.NODE_ENV === 'production') {

  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
