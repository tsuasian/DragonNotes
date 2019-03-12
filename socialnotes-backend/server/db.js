'use strict';
const mysql = require('mysql');

//Better would be ~ password: process.env.MYSQL_PASS etc
let pool = mysql.createPool({
    host: '104.248.211.187',
    port: '3306',
    user: 'social',
    password: process.env.MYSQL_PASS,
    database: 'socialnotes',
    connectionLimit: 10,
    supportBigNumbers: true
});

module.exports = {
    getConnection: (callback) => {
        return pool.getConnection(callback);
    }
};
