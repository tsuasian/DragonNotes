'use strict';

const express = require('express');
const router = express.Router();

module.exports = () => {

    router.get('/', (req, resp, next) => {
        return resp.send(`I guessing this is the route where you type notes?`);
    });

    router.get('/:userName', (req, resp, next) => {
        return resp.send(`This is the profile page for ${req.params.userName}`);
    });

    return router;
};
