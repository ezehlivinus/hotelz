const Joi = require('joi');

exports.CreateRoomSchema = Joi.object({
  codeName: Joi.string().min(3).max(100).required()
    .trim(),
  roomType: Joi.string().hex().trim().required()
    .length(24),
  price: Joi.number().required().min(1)
});

exports.UpdateRoomSchema = Joi.object({
  codeName: Joi.string().min(3).max(100).optional()
    .trim(),
  roomType: Joi.string().hex().trim().optional()
    .length(24),
  price: Joi.number().optional().min(1)
});

exports.RoomQueryParamsSchema = Joi.object({
  search: Joi.string().optional().trim(),
  roomType: Joi.string().optional().trim(),
  minPrice: Joi.number().optional().min(0).default(0),
  maxPrice: Joi.number().optional().greater(Joi.ref('minPrice'))
});
