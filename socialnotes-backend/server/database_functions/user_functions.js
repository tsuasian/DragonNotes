'use strict';
const db = require('../db.js');

// Example functions
exports.getUsersByFirstName = (firstName, callback) => {

    const sql = "SELECT * FROM Users WHERE firstName=?";
    // get a connection from the pool
    db.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        // make the query
        connection.query(sql, [firstName], function(err, results) {
            connection.release();
            if(err) { console.log(err); callback(true); return; }
            callback(false, results);
        });
    });
};

exports.getUsersByLastName = (lastName, callback) => {
    const sql = "SELECT * FROM Users WHERE lastName=?";
    // get a connection from the pool
    db.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        // make the query
        connection.query(sql, [lastName], function(err, results) {
            connection.release();
            if(err) { console.log(err); callback(true); return; }
            callback(false, results);
        });
    });
};