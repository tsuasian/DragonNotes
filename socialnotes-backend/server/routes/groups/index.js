'use strict';

const express = require('express');
const router = express.Router();

module.exports = () => {

    router.get('/', (req, res, next) => {
        return res.send(`This is the groups route`);
    });

    router.get('/:groupId', (req, res, next) => {
        return res.send(`I'm going to send you the details for groupId ${req.params.groupId}`);
    });

    return router;
};