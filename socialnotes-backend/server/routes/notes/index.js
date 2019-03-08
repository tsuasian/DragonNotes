'use strict';

const express = require('express');
const router = express.Router();

module.exports = () => {
    router.get('/', (req, res, next) => {
        return res.send('this is ya notes');
    });

    router.get('/:userNumber', (req, res, next) => {
        return res.send(`I'm going to send you the notes of user ${req.params.userNumber}`);
    });

    return router;
};