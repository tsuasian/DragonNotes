'use strict';

const express = require('express');
const router = express.Router();

module.exports = () => {

    router.get('/', (req, resp, next) => {
        return resp.send(`This is the groups route`);
    });

    router.get('/:groupId', (req, resp, next) => {
        return resp.send(`I'm going to send you the details for groupId ${req.params.groupId}`);
    });

    return router;
};