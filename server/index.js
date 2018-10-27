const path = require('path')
const express = require('express');  //import
const bodyParser = require('body-parser')
const mysql = require('mysql');
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

app.use(express.static(path.join(__dirname, "/views/")));


app.post('/login', (request, response) => {         //working on localhost for login
    
    response.status(200);
    

    console.log(JSON.stringify(request.body));
    connection.query('SELECT * FROM students', (err, rows) => {
        response.removeHeader("*");

        let isAuthenticated;    //Flag for Authentication


        if (err) throw err;

        for(var row of rows){
            if (request.body.id == row.s_id && request.body.password == row.s_password) {
                console.log("authenticated")

                // use it for request purpose. just copy paste
                isAuthenticated = true;
                // below line is used for sending data to front-end
                break
            }
            else {
                
                console.log("not authenticated")
                isAuthenticated = false;
                
            }
        }
        // rows.forEach((row) => {
        //     if (request.body.id == row.s_id && request.body.password == row.s_password) {
        //         console.log("authenticated")

        //         // use it for request purpose. just copy paste
        //         isAuthenticated = true;
        //         // below line is used for sending data to front-end
        //     }
        //     else {
                
        //         console.log("not authenticated")
        //         isAuthenticated = false;
                
        //     }
        // });

        if(isAuthenticated){
            response.status = "200";
            response.bodyUsed = true;
    
            response.send(JSON.stringify({ authentication: "successful" }))
            
        }else{
            response.status = "500";
            response.bodyUsed = true;

            response.send(JSON.stringify({ authentication: "unsuccessful" }))

        }
    })
})
app.listen(4000, () => {
    console.log('we are live at 4000')

})      