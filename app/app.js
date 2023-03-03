const express = require('express');

const appMiddleware = require('./app.middleware');

const app = express();

appMiddleware(app);

exports.app = app;
