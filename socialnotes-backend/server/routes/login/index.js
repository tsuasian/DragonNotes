'use strict';

const express = require('express');
const router = express.Router();

module.exports = () => {
    router.get('/', (req, resp, next) => {
        return resp.send('This is the login page');
    });

    router.post('/', (req, resp, next) => {
        return resp.send(`I guess this is where we post the encrypted password`);
    });

    return router;
};