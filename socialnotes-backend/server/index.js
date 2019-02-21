'use strict';

const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const mysql = require('mysql');
// Import the routes folder, which has our different routes in it
const routes = require('./routes');
// const db = require('./db');

// Express is listening on a port (8080, in our case).
// It first passes the request through the chain of middleware here
// (all these .use things)

//Express middleware, gets the folder where our public assets are
app.use(express.static('public')); //for static files
app.use('/', routes()); //this uses the routes folder
app.use(express.static('.'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(express.static("."));





let connection = mysql.createConnection({
    host: '167.99.83.201',
    port: '3306',
    user: 'socialnotes',
    password: 'Mario275!',
    database: 'socialnotes'
});
connection.connect(function(err) {
    if (err) {
        console.log("Error connecting to database");
        console.log(err);
    }
    else {
        console.log("Database successfully connected");
    }
});

app.get('/query/:thing',function(req,res){
    // var post  = {from:'me', to:'you', msg:'hi'};
    connection.query('SELECT * from Users;', function(err, rows) {
        if (err) {
            console.log('Error during query processing');
            throw err;
        }
        else {
            console.log('Here is the result : ', rows);
        }

    });
});






// Listen for requests on port 8080
app.listen(8080,function(){
    console.log('Welcome to SocialNotes!');
    console.log('=======================');
    console.log('Server Started on port 8080...');
});

module.exports = {
    app: app
};
// module.export = app;
// module.export = connection;

