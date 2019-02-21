'use strict';

const express = require('express');
const router = express.Router();

module.exports = () => {

    router.get('/:noteId', (req, resp, next) => {
        return resp.send(`I'm going to send you the comments for noteId ${req.params.noteId}`);
    });

    return router;
};