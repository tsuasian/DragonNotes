'use strict';

const express = require('express');
const router = express.Router();
const db = require("../../db.js");

module.exports = () => {

    router.get('/', (req, resp, next) => {

        db.getUsersByLastName("Pena", function (err, results) {
            if(err) { resp.send(500,"Server Error"); return;}
            resp.send(results);
        });
    });

    router.get('/:userName', (req, resp, next) => {
        return resp.send(`This is the profile page for ${req.params.userName}`);
    });

    return router;
};
