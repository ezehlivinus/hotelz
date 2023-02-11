const mongoose = require('mongoose');
const logger = require('pino')()

module.exports = (function database() {
const startdb = () => {
  mongoose.set('strictQuery', false)
  mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
      logger.info('Connected to database...');
    }).catch((error) => {
      console.log(error);
      logger.error('Error connecting to database...', error);
      logger.info('Reconnecting to database...');
      startdb();
    });
};

startdb()
})
