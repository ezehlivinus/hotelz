const express = require('express');
const roomTypeController = require('../controllers/room-type.controller');
const validator = require('../middlewares/validator.middleware');
const { CreateRoomTypeSchema } = require('../schemas/room-type.schema');

const roomTypeRouter = express.Router();

roomTypeRouter.post('/', [
  validator(CreateRoomTypeSchema)
], roomTypeController.create);
roomTypeRouter.get('/:id', roomTypeController.findById);

// roomTypeRouter.get('/', roomTypeController.find);

// roomTypeRouter.put('/:id', roomTypeController.update);

// roomTypeRouter.delete('/:id', roomTypeController.delete);

module.exports = roomTypeRouter;
