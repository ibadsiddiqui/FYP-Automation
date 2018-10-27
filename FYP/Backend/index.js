const express = require('express');
const bodyParser = require('body-parser')
const app = express();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req,res) => {
    res.json({home: 'Welcome to Home Page'})
})

app.listen(3000, () => {
    console.log('listening on port: ' + 3000)
})