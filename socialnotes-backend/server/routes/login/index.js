'use strict';

const express = require('express');
const router = express.Router();

module.exports = () => {
    router.get('/', (req, res, next) => {
        return res.send('This is the login page');
    });

    router.post('/', (req, res, next) => {
        return res.send(`I guess this is where we post the encrypted password`);
    });

    return router;
};