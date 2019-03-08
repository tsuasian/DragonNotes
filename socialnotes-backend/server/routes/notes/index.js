'use strict';

const express = require('express');
const router = express.Router();
const dbNoteFunctions = require("../../database_functions/note_functions.js");
const cors = require('cors');
// const bodyParser = require("body-parser");


module.exports = () => {

    router.use(cors());

    router.get('/:userId', (req, resp, next) => {

        const id = req.params.userId;
        console.log(req.params.userId);

        dbNoteFunctions.getNotesByUser(id, function (err, results) {
            if(err) { resp.send(500,"Server Error"); return;}
            resp.send(results);
        });
    });

    // POST a new note.
    // Body of requests should look like this:
    // {
    //     "postText": "my name is Timbo Jones",
    //     "userId": 1
    // }
    router.post('/', cors(), (req, res, next) => {
        let post = req.body;
        let postText = post.postText;
        let userId = post.userId;
        dbNoteFunctions.addNote(userId, postText, function (err, results) {
            if(err) { res.send(500,"Server Error"); return;}
            res.send(results);
        });
    });

    return router;
};
