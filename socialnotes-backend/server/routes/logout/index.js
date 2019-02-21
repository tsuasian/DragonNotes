'use strict';

const express = require('express');
const router = express.Router();

module.exports = () => {
    router.get('/', (req, resp, next) => {
        return resp.send('You are now logged out');
    });

    return router;
};