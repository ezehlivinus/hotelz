require('express-async-errors');
const logger = require('pino')();

const { app } = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
});
