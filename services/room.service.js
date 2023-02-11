/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable class-methods-use-this */
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
    // if someone is filtering by room type
    if (filter?.roomType) {
      // find the room type, b/c we need its id
      const existingRoomType = await roomTypeService.findOne({
        codeName: filter.roomType
      });

      // if something was found
      if (existingRoomType) {
        // store the filter.roomType, this because that is the fields name in Room model
        // this makes it to be part of the filter query
        // Yes: someone cannot type id by him/her self
        _filter.roomType = existingRoomType?._id;
      }
    }

    const rooms = await Room.find(_filter)
      .populate({
        path: 'roomType', // this is the room type field on Room collection
        model: 'RoomType', // the model name that room.roomType is associated with or reference to
        select: 'id codeName' // when populating select only the id and name of the parent
      });

    return rooms;
  }

  async search(filter = {}) {
    const searchTerm = {
      // we are using the or operator to search the two fields below
      $or: [
        {
          name: {
            $regex: filter?.search,
            $options: 'i'
          }
        },
        {
          size: { $regex: filter?.search, $options: 'i' }
        },
        {
          price: { $regex: filter?.search, $options: 'i' }
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
