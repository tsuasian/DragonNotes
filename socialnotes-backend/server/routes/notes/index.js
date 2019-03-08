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

        // return resp.send(`I'm going to send you the notes of user ${req.params.userName}`);
    });

    return router;
};

/*
'use strict';

const express = require('express');
const router = express.Router();
const dbUserFunctions = require("../../database_functions/user_functions.js");
const cors = require('cors');

module.exports = () => {

    router.get('/', cors(), (req, resp, next) => {

        dbUserFunctions.getUsersByLastName("Kennedy", function (err, results) {
            if(err) { resp.send(500,"Server Error"); return;}
            resp.send(results);
        });
    });

    router.get('/:userName', cors(), (req, resp, next) => {
        return resp.send(`This is the profile page for ${req.params.userName}`);
    });

    return router;
};

*/
