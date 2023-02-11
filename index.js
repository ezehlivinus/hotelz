const express = require('express');
require('express-async-errors');

const logger = require('pino')();
const indexMiddleware = require('./middlewares/index.middleware');

const app = express();

indexMiddleware(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
});
