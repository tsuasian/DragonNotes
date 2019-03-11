'use strict';

const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const dbNoteFunctions = require("../../database_functions/notes_functions.js");
=======
const dbNoteFunctions = require("../../database_functions/note_functions.js");
const cors = require('cors');
// const bodyParser = require("body-parser");

>>>>>>> be25b87a460ca0ad5ee3fe52fd46f6b5e42a91fa

module.exports = () => {

    router.use(cors());

    // Get all notes by a given user. E.g. GET http://localhost:8080/notes/3
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

    // Edit a new note.
    // Body of requests should look like this:
    // {
    //     "postText": "dis is mah new note",
    //     "noteId": "30799eee-4b98-4f2f-9f21-eb9e4464001f"
    // }
    router.patch('/', cors(), (req, res, next) => {
        let patch = req.body;
        let newText = patch.postText;
        let noteId = patch.noteId;
        dbNoteFunctions.editNote(noteId, newText, function (err, results) {
            if(err) { res.send(500,"Server Error"); return;}
            res.send(results);
        });
    });

    return router;
};
