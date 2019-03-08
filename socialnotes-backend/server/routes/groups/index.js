'use strict';

const express = require('express');
const router = express.Router();
const dbNoteFunctions = require("../../database_functions/note_functions.js");
const dbGroupFunctions = require("../../database_functions/group_functions");
const cors = require('cors');

module.exports = () => {

    router.use(cors());

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

    // Create a new group
    // Body of requests should look like this:
    // {
    //     "groupId": "161420ed-a009-44b6-95e6-11177ddc946e"
    // }
    router.post('/', cors(), (req, res, next) => {
        let post = req.body;
        let groupId = post.groupId;

        dbGroupFunctions.createGroup(groupId, function (err, results) {
            if(err) { res.send(500,"Server Error"); return;}
            res.send(results);
        });
    });

    return router;
};