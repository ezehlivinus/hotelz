/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable class-methods-use-this */
const _ = require('lodash');
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
    const rooms = await Room.find(filter)
      .populate({
        path: 'roomType', // this is the room type field on Room collection
        model: 'RoomType', // the model name that room.roomType is associated with or reference to
        select: 'id codeName' // when populating select only the id and name of the parent
      });

    return rooms;
  }

  async search(filter = {}) {
    // begin: handle price case
    const priceQuery = {};
    if (filter?.minPrice) {
      priceQuery.price = { $gte: filter?.minPrice };
    }

    if (filter?.maxPrice) {
      priceQuery.price = {
        $gte: filter?.minPrice,
        $lte: filter?.maxPrice
      };
    }

    // end handle price case
    // begin handle room type case
    let roomTypesIds;

    if (filter?.roomType) {
      // make a search query for room type
      const searchRoomTypeQuery = {
        codeName: {
          $regex: filter?.roomType,
          $options: 'i'
        }
      };

      const searchedRoomTypes = await roomTypeService.list(searchRoomTypeQuery);

      // if something was found
      if (!_.isEmpty(searchedRoomTypes)) {
        // pick out all the room type identifiers (ids) that was found
        roomTypesIds = searchedRoomTypes.map((rooType) => rooType._id);
      }
    }

    const searchTerm = {
      // we are using the or operator to search all the fields
      $or: []
    };

    if (filter?.search) {
      searchTerm.$or.push({
        codeName: {
          $regex: filter?.search,
          $options: 'i'
        }
      });
    }

    // add price query if it not empty
    if (!_.isEmpty(priceQuery)) {
      searchTerm.$or.push(priceQuery);
    }

    // if roomTypesIds is not empty, it means we found something
    if (!_.isEmpty(roomTypesIds)) {
      searchTerm.$or.push({
        roomType: { $in: roomTypesIds }
      });
    }

    const result = await Room.find(searchTerm).populate({
      path: 'roomType',
      model: 'RoomType'
    });

    return result;
  }
}

module.exports = new RoomService();
