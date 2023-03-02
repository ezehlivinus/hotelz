const express = require('express');
const roomController = require('../controllers/room.controller');
const validator = require('../middlewares/validator.middleware');
const { CreateRoomSchema, RoomQueryParamsSchema, UpdateRoomSchema } = require('../schemas/room.schema');

const roomRouter = express.Router();

roomRouter.post('/', [
  validator(CreateRoomSchema)
], roomController.create);

roomRouter.get('/', [
  validator(RoomQueryParamsSchema, 'query')
], roomController.find);

// roomRouter.get('/:id', roomController.findById);

roomRouter.put('/:id', [
  validator(UpdateRoomSchema)
], roomController.update);

// roomRouter.delete('/:id', roomController.delete);

module.exports = roomRouter;
