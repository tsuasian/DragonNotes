'use strict';
const mysql = require('mysql');

//Better would be ~ password: process.env.MYSQL_PASS etc
let pool = mysql.createPool({
    host: '167.99.83.201',
    port: '3306',
    user: 'socialnotes',
    password: 'Mario275!',
    database: 'socialnotes',
    connectionLimit: 10,
    supportBigNumbers: true
});

module.exports = {
    getConnection: (callback) => {
        return pool.getConnection(callback);
    }
};