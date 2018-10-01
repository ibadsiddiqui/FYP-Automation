const mysql = require('mysql');
const express = require('express');  //import
const bodyParser = require('body-parser')
const app = express();  // created app "express"


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0216633236',
    database: 'test1'
})

connection.connect((err) => {
    if (err) {
        console.log('error in connection');
    } else {
        console.log('connected')
    }
});

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(4000, () => {
    console.log('we are live at 4000')
    app.post('/login', (request, response) => {         //working on localhost for login
        response.writeHead(200, { 'Content-Type': 'application/json' });
        var body = JSON.parse(request.body);
        // response.status(200);

        // console.log(body);
        connection.query('SELECT * FROM students', (err, rows) => {
            if (err) throw err;
            var data = ""
            rows.forEach((row) => {
                if (body.id == row.s_id && body.password == row.s_password) {
                    console.log("authenticated")
                    data = "authenticated"
                    // response.send(data)
                    
                    // response.send(data)
                    response.end(data)
                    // response.send("Hello word")
                    }   //cheching from database id n password
                else {
                    response.send('use correct credentials')
                    console.log('use correct credentials')
                }
            });
        })
    })

})      