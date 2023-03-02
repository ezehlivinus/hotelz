const express = require('express');

const indexMiddleware = require('./middlewares/index.middleware');

const app = express();

indexMiddleware(app);

exports.app = app;
