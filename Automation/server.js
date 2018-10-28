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
    if (user !== null) {
      registered = true
    } else {
      registered = false;
    }

    console.log(registered)

    if (registered == true) {
      response.send({
        registered: true, error: "User by this name Exit"
      })
    } else if (registered == false) {
      const newUser = new User({
        name: name,
        username: username,
        email: email,
        password: password
      });
      User.registerUser(newUser, (err, user) => {
        if (err)
          response.send({ auth: "Error in creating new user. Please try again" })
        response.send({ auth: "Successful" })
      })
    }
  });

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
          response.send({ message: "Password Matched" })
        } else {
          response.send({ message: "Wrong Password" })
        }
      })
    } else {
      response.send({message: 'Not registered'})
    }
  });

})

app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
