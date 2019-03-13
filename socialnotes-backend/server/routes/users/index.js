'use strict';

const express = require('express');
const router = express.Router();
const dbUserFunctions = require("../../database_functions/user_functions.js");
const cors = require('cors');


module.exports = () => {

    router.get('/', cors(), (req, res, next) => {
        dbUserFunctions.getUsersByLastName("Kennedy", function (err, results) {
            if(err) { res.send(500,"Server Error"); return;}
            res.send(results);
        });
    });

    router.get('/:userName', cors(), (req, res, next) => {
        return res.send(`This is the profile page for ${req.params.userName}`);
    });

    // Check if email/password combination exists for login purposes
    router.post('/UserExist', cors(), (req, res, next) =>
    {
        let post = req.body;
        let postEmail = post.email
        let postPasswordHash = post.passwordHash;

        dbUserFunctions.ExistUser(postEmail, postPasswordHash,  function (err, results) {
            if(err) { resp.send(500,"Server Error"); return;}
            res.send(results);
        });
    });
    return router;
};
