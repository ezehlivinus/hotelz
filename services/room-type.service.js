/* eslint-disable class-methods-use-this */
const { RoomType } = require('../models/room-types.model');

class RoomTypeService {
  async create(newRoomTypeData) {
    const newRoomType = await RoomType.create(newRoomTypeData);

    return newRoomType;
  }

  async findOne(filter) {
    const roomType = await RoomType.findOne(filter);

    return roomType;
  }

  async findById(id) {
    const roomType = await RoomType.findById(id);

    return roomType;
  }
}

module.exports = new RoomTypeService();
