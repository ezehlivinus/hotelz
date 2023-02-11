const mongoose = require('mongoose');
const { RoomType } = require('./room-types.model');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    unique: true,
    trim: true
  },
  price: {
    type: Number,
    min: 1,
    required: true
  },
  size: {
    type: String,
    enum: ['small', 'big', 'medium'],
    lowercase: true,
    default: 'small'
  },
  roomType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoomType',
    required: true
  }
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);

exports.Room = Room;
