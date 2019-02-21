//somehow factor out DB functions into files like this.


// const mysql = require('mysql');
// const pool = require('../db.js');
//
// exports.getUsersByFirstName = function(firstName, callback) {
//     const sql = "SELECT * FROM Users WHERE firstName=?";
//     // get a connection from the pool
//     pool.getConnection(function(err, connection) {
//         if(err) { console.log(err); callback(true); return; }
//         // make the query
//         connection.query(sql, [firstName], function(err, results) {
//             connection.release();
//             if(err) { console.log(err); callback(true); return; }
//             callback(false, results);
//         });
//     });
// };
//
// exports.getUsersByLastName = function(lastName, callback) {
//     const sql = "SELECT * FROM Users WHERE lastName=?";
//     // get a connection from the pool
//     pool.getConnection(function(err, connection) {
//         if(err) { console.log(err); callback(true); return; }
//         // make the query
//         connection.query(sql, [lastName], function(err, results) {
//             connection.release();
//             if(err) { console.log(err); callback(true); return; }
//             callback(false, results);
//         });
//     });
// };