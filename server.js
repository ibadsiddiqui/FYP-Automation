const path = require('path')

const mongoose = require('mongoose');
const expressEdge = require('express-edge');

const express = require('express');
const bodyParser = require('body-parser')

const app = express();


const LoginAuthController = require('./controllers/Auth/Login')
const RegisterAuthController = require('./controllers/Auth/Register')
const GetUsernameAuthController = require('./controllers/UserInfo/GetDetails')
const UpdateUserProfileController = require('./controllers/UserInfo/UpdateUserProfileController')

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

// registration process
app.get('/', (request, response) => {
  console.log('inside /')

  response.render('index')
})

app.get('/calender', (request, response) => {
  console.log('inside asd')

  response.render('calender')
})


app.post('/login', LoginAuthController);
app.post('/register', RegisterAuthController);

// getting info using token
app.get('/getusername', GetUsernameAuthController)
app.get('/getuserinfo', GetUsernameAuthController)

app.post('/updateuserprofile', UpdateUserProfileController)


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
