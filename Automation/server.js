const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

const app = express();

mongoose.connect('mongodb://localhost/Automation');
const User = require('./models/User/User')
const port = process.env.PORT || 4000;




if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// registration process
app.post('/register', async (request, response) => {
  console.log(request.body)
  const name = request.body.name;
  const username = request.body.username;
  const email = request.body.email;
  const password = request.body.password;

  var registered;

  await User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (user === null) {
      registered = false
    } else {
      registered = true;
    }

    console.log(registered)

    if (registered === true) {

      // meaning user is already registered by that username
      response.send({ registration: false })

    } else if (registered === false) {

      // following steps registers a new user and sends response
      const newUser = new User({
        name: name,
        username: username,
        email: email,
        password: password
      });

      User.registerUser(newUser, (err, user) => {
        if (err)
          response.send({ registration: "Error in creating new user. Please try again" })
        response.send({ registration: true })
      })
    }
  });

})

app.post('/getusername', (request, response) => {
  const username = request.body.username;
  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (user !== null) {
      isRegistered = true
    } else {
      isRegistered = false;
    }
    response.send({response: isRegistered})

  })
})

app.post('/login', (request, response) => {

  const username = request.body.username;
  const password = request.body.password;


  var isRegistered;
  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (user !== null) {
      isRegistered = true
    } else {
      isRegistered = false;
    }

    console.log(isRegistered)

    if (isRegistered == true) {

      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          response.send({ 
            message: "Password Matched",
            auth: true
          })
        } else {
          response.send({ 
            message: "Wrong Password",
            auth: false,
          })
        }
      })
    } else {
      response.send({ 
        message: 'Not registered',
        auth: false
      })
    }
  });

})

app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
