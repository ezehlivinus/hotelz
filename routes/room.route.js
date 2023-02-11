const express = require('express');
const roomController = require('../controllers/room.controller');

const roomRouter = express.Router();

roomRouter.post('/', roomController.create);

roomRouter.get('/', roomController.find);

// roomRouter.get('/:id', roomController.findById);

// roomRouter.put('/:id', roomController.update);

// roomRouter.delete('/:id', roomController.delete);

module.exports = roomRouter;
