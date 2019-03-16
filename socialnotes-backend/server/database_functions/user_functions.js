'use strict';
const db = require('../db.js');
const dbFunctions = require("./db_functions.js");

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

//register user
exports.registerUser = (passwordHash, fName, lName, uName, email, callback) => {
    fName = (fName).toString();
    lName = (lName).toString();
    uName = (uName).toString();
    email = (email).toString();
    const sql = `INSERT INTO Users (passwordHash, firstName, lastName, userName, email) VALUES ('${passwordHash}', '${fName}', '${lName}', '${uName}', '${email}') ;`;
    // get a connection from the pool
    db.getConnection(function(err, connection) {
        //callback if server error
        if(err) { console.log(err); callback(true); return; }
        connection.query(sql, function(err, results) {
            connection.release();
            if(err) { console.log(err); callback(true); return; }
            callback(false, results);
        });
    });
};

exports.loginUser = (email, password, callback) => {
  let loginEmail = (email).toString()
  let passHash = (password).toString()
  const sql = `SELECT * FROM Users WHERE email = '${loginEmail}' AND passwordHash = '${passHash}';`

  db.getConnection(function(err, connection) {
      //callback if server error
      if(err) { console.log(err); callback(true); return; }
      connection.query(sql, function(err, results) {
          connection.release();
          if(err) { console.log(err); callback(true); return; }
          callback(false, results);
      });
  });
}

// Check if email/password combination exists for login purposes
exports.ExistUser = (email, passHash, callback) => {
    const sql = `Select email FROM Users WHERE email = '${email}' AND passwordHash = '${passHash}';`
    dbFunctions.makeSqlQuery(sql, callback);
}
