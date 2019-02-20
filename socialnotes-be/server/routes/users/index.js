'use strict';

const express = require('express');
const router = express.Router();
const con =

module.exports = () => {

    router.get('/', (req, resp, next) => {

        con.query('SELECT * from Users',
            function(err,rows,fields) {
                if (err)
                    console.log('Error during query processing');
                else
                    console.log('Here is the result : ', rows);
// See next slide for an alternate way to parse
//and display the result
            });
        return resp.send(`I guessing this is the route where you type notes?`);
    });

    router.get('/:userName', (req, resp, next) => {
        return resp.send(`This is the profile page for ${req.params.userName}`);
    });

    return router;
};
