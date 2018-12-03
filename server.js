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

app.get('/',  adminDashboard)
app.get('/manageusers', adminManageUsers)
app.get('/fyplist', adminManageFYPList)
app.get('/manageeligibilities', adminManageEligibilities)
app.get('/manageprojects', adminManageProjects)
////////////////////////////////////////////////////////



// authentication work
const LoginAuthController = require('./controllers/Auth/Login')
const RegisterAuthController = require('./controllers/Auth/Register')

app.post('/login', LoginAuthController);
app.post('/register', RegisterAuthController);
////////////////////////////////////////////////


// getting info using token
const GetUsernameAuthController = require('./controllers/UserInfo/GetDetails')
app.get('/getusername', GetUsernameAuthController)
app.get('/getuserinfo', GetUsernameAuthController)
///////////////////////////////////////////////////////


// user controllers for updating profile

const UpdateUserProfileController = require('./controllers/UserInfo/UpdateUserProfileController')
app.post('/updateuserprofile', UpdateUserProfileController)
/////////////////////////////////////////////////////

// project request controllers
const submitProjecttController = require('./controllers/Project/submitProjecttController')
const submitProjectProposal = require('./controllers/Project/submitProjectProposal')

app.post('/insertProject', submitProjecttController)
app.post('/submitProjectProposal', submitProjectProposal)




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
