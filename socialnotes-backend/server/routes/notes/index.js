'use strict';

const express = require('express');
const router = express.Router();
const dbNoteFunctions = require("../../database_functions/note_functions.js");

module.exports = () => {
    router.get('/', (req, resp, next) => {
        return resp.send('this is ya notes');
    });

    router.get('/:userId', (req, resp, next) => {

        const id = req.params.userId;
        console.log(req.params.userId);

        dbNoteFunctions.getNotesByUser(id, function (err, results) {
            if(err) { resp.send(500,"Server Error"); return;}
            resp.send(results);
        });
    });

    return router;
};
