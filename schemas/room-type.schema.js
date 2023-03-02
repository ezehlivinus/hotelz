const Joi = require('joi');

exports.CreateRoomTypeSchema = Joi.object({
  // since is the only field, we decided to make it required
  codeName: Joi
    .string()
    .min(3)
    .max(100)
    .required()
    .trim()
    .lowercase()
});
