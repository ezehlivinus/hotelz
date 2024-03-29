/* eslint-disable class-methods-use-this */
const _ = require('lodash');

const roomService = require('../services/room.service');

class RoomController {
  async create(req, res) {
    const newRoom = await roomService.create(req.body);

    return res.status(201).send({
      success: true,
      message: 'Room created successfully',
      data: newRoom
    });
  }

  async find(req, res) {
    // the person want to make a search
    if (!_.isEmpty(req?.query?.search)) {
      const searchedResult = await roomService.search(req.query);
      return res.status(200).send({
        success: true,
        message: 'Rooms search successfully',
        data: searchedResult
      });
    }

    const rooms = await roomService.find();

    if (_.isEmpty(rooms)) {
      return res.status(404).send({
        success: false,
        message: 'Room not found'
      });
    }

    return res.status(200).send({
      success: true,
      message: 'Room found successfully',
      data: rooms
    });
  }

  // get one room
  // async findById(req, res) { }

  async update(req, res) {
    const updatedRoom = await roomService.update(req.params.id, req.body);

    return res.status(200).send({
      success: true,
      message: 'Room updated successfully.',
      data: updatedRoom
    });
  }

  // async delete(req, res) { }
}

module.exports = new RoomController();
