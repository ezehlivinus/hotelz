/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable class-methods-use-this */
const { RoomType } = require('../models/room-types.model');
const { Room } = require('../models/room.model');
const roomTypeService = require('./room-type.service');

class RoomService {
  async create(newRoomData) {
    // find room type if exist
    const roomType = await roomTypeService.findById(newRoomData.roomType);

    if (!roomType) {
      throw new Error('Room type not found');
    }

    const newRoom = new Room(newRoomData);

    await newRoom.save();

    return newRoom;
  }

  async find(filter = {}) {
    const _filter = structuredClone(filter);
    // if one is filtering room type
    if (filter?.roomType) {
      // find the room type, b/c we need it id
      const existingRoomType = await roomTypeService.findOne({
        codeName: filter.roomType
      });

      // if something was found
      if (existingRoomType) {
        _filter.roomType = existingRoomType?._id;
      }
    }

    const rooms = await Room.find(_filter)
      .populate({
        path: 'roomType',
        model: 'RoomType',
        select: 'id codeName'
      });

    return rooms;
  }

  async search(filter = {}) {
    const searchTerm = {
      $or: [
        {
          name: {
            $regex: filter?.search,
            $options: 'i'
          }
        },
        {
          size: { $regex: filter?.search, $options: 'i' }
        }
      ]
    };

    const result = await Room.find(searchTerm).populate({
      path: 'roomType',
      model: 'RoomType'
    });

    return result;
  }

}

module.exports = new RoomService();
