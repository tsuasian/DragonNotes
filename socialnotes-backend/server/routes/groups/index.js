'use strict';

const express = require('express');
const router = express.Router();
const dbNoteFunctions = require("../../database_functions/note_functions.js");

module.exports = () => {

    router.get('/', (req, resp, next) => {
        return resp.send(`This is the groups route`);
    });

    router.get('/:groupId', (req, resp, next) => {
        const gid = req.params.groupId;

        dbNoteFunctions.getNotesInGroup(gid, function (err, results) {
            if(err) { resp.send(500,"Server Error"); return;}
            resp.send(results);
        });
    });

    return router;
};