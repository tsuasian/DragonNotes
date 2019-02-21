'use strict';

const express = require('express');
const mysql = require('mysql');

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

module.export = connection;