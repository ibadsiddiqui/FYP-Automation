const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

const app = express();
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

app.post('/login', (req,res) => {
  console.log(req.body)
  res.send({ "auth": 'success' });

})


app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
