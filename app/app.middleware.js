const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const asyncError = require('./common/errors.common');
const indexRoutes = require('./app.routes');

require('./config/database.config')();

module.exports = (app) => {
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.json());
  indexRoutes(app);

  app.use(asyncError);
};
