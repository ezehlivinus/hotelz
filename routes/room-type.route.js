const express = require('express');
const roomTypeController = require('../controllers/room-type.controller');
const roomTypeRouter = express.Router();

roomTypeRouter.post('/', roomTypeController.create);
roomTypeRouter.get('/:id', roomTypeController.findById);

// roomTypeRouter.get('/', roomTypeController.find);

// roomTypeRouter.put('/:id', roomTypeController.update);

// roomTypeRouter.delete('/:id', roomTypeController.delete);


module.exports = roomTypeRouter;
