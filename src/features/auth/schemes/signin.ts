import Joi, { ObjectSchema } from 'joi';

export const loginSchema: ObjectSchema = Joi.object().keys({
  username: Joi.string().required().min(4).max(8).messages({
    'string.base': 'username must be a string',
    'string.min': 'username invalid',
    'string.max': 'username invalid',
    'string.empty': 'username must be filled'
  }),
  password: Joi.string().required().min(4).max(8).messages({
    'string.base': 'password must be a string',
    'string.min': 'password invalid',
    'string.max': 'password invalid',
    'string.empty': 'password must be filled'
  })
});
