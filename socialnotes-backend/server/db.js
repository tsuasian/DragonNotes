const mysql = require('mysql');

//Better:
// host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASS,
//     database: process.env.MYSQL_DB,
let pool = mysql.createPool({
    host: '167.99.83.201',
    port: '3306',
    user: 'socialnotes',
    password: 'Mario275!',
    database: 'socialnotes',
    connectionLimit: 10,
    supportBigNumbers: true
});

// Example function
exports.getUsersByFirstName = function(firstName, callback) {
    const sql = "SELECT * FROM Users WHERE firstName=?";
    // get a connection from the pool
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        // make the query
        connection.query(sql, [firstName], function(err, results) {
            connection.release();
            if(err) { console.log(err); callback(true); return; }
            callback(false, results);
        });
    });
};