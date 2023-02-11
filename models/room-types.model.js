/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
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

roomTypeSchema.set('toJSON', {
  versionKey: false,

  transform(doc, ret) {
    delete ret.__v;
  }
});

const RoomType = mongoose.model('RoomType', roomTypeSchema);

exports.RoomType = RoomType;
