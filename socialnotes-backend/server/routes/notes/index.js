'use strict';

const express = require('express');
const router = express.Router();

module.exports = () => {
    router.get('/', (req, resp, next) => {
        return resp.send('this is ya notes');
    });

    router.get('/:userNumber', (req, resp, next) => {
        return resp.send(`I'm going to send you the notes of user ${req.params.userNumber}`);
    });

    return router;
};