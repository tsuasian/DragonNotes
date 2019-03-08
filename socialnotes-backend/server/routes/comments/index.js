'use strict';

const express = require('express');
const router = express.Router();

module.exports = () => {

    router.get('/:noteId', (req, res, next) => {
        return res.send(`I'm going to send you the comments for noteId ${req.params.noteId}`);
    });

    return router;
};