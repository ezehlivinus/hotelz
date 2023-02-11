const roomTypeRouter = require('./room-type.route');
const roomRouter = require('./room.route');

const basePath = '/api/v1';

module.exports = (app) => {
  // routes goes here
  app.use(`${basePath}/room-types`, roomTypeRouter);
  app.use(`${basePath}/rooms`, roomRouter);
};
