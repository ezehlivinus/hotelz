/* eslint-disable class-methods-use-this */
const roomTypeService = require('./room-type.service');

class RoomTypeController {
  async create(req, res) {
    const roomType = await roomTypeService.findOne({
      codeName: req.body.codeName
    });

    // if this exist
    if (roomType) {
      return res.status(409).send({
        success: false,
        message: 'Room already exists'
      });
    }

    const newRoomType = await roomTypeService.create(req.body);

    return res.status(201).send({
      success: true,
      message: 'created room type',
      data: newRoomType
    });
  }

  // get one
  async findById(req, res) {
    const roomType = await roomTypeService.findById(req.params.id);

    if (!roomType) {
      return res.status(404).send({
        success: false,
        message: 'Room not found'
      });
    }

    return res.status(200).send({
      success: true,
      message: 'Room type found',
      data: roomType
    });
  }

  // get all
  // async find(req, res) { }

  // async update(req, res) { }

  // async delete(req, res) { }
}

module.exports = new RoomTypeController();
