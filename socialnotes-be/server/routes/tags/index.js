'use strict';

const express = require('express');
const router = express.Router();

module.exports = () => {
    router.get('/', (req, resp, next) => {
        return resp.send('this is ya tags');
    });

    router.get('/:noteId', (req, resp, next) => {
        return resp.send(`I'm going to send you the tags associated with ${req.params.noteId}`);
    });

    return router;
};