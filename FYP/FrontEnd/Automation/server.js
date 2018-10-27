const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

const app = express();

mongoose.connect('mongodb://localhost/Automation');
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
app.use(bodyParser.urlencoded({extended: true}))

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/register', (req,res) => {
  const User = require('./models/Auth/Auth');

  console.log(req.body)

  User.username = req.body.username;
  User.id = req.body.id;
  User.email = req.body.email;
  User.password = req.body.password

  User.save( (err, user) => {
    if(err) throw err;
    res.send(user);
  })
})

app.post('/login', (req,res) => {
  const UserCredentials = require('./models/Auth/Auth');
  UserCredentials
})

app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
