'use strict';

const express = require('express');
const router = express.Router();
const dbUserFunctions = require("../../database_functions/user_functions.js");
const cors = require('cors');
const bodyparser = require('body-parser');

module.exports = () => {

  router.use(cors())

  router.post('/', cors(), (req, res, next) => {
    console.log("register route hit!")
    let user = req.body
    console.log("req body", user)
    let fName = user.fName
    let lName = user.lName
    let email = user.email
    let password = user.password
    let username = user.userName
    dbUserFunctions.registerUser(password, fName, lName, username, email, function (err, results) {
        if(err) { res.send(500,"Server Error"); return;}
        res.send(results);
    });
  });

  return router;
}
