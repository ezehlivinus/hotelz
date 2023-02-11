const mongoose = require('mongoose');

const roomTypeSchema = new mongoose.Schema({
  codeName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    unique: true,
    trim: true
  }
}, { timestamps: true });

const RoomType = mongoose.model('RoomType', roomTypeSchema);

exports.RoomType = RoomType;
