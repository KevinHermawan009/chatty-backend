import Joi, { ObjectSchema } from 'joi';

const passwordSchema: ObjectSchema = Joi.object().keys({

  password: Joi.string().required().min(4).max(8).messages({
    'string.base': 'password must be a string',
    'string.min': 'password invalid',
    'string.max': 'password invalid',
    'string.empty': 'password must be filled'
  }),
  confimPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': 'password must be match',
    'any.required': 'confirm password is a require field',
  })

});

const emailSchema: ObjectSchema = Joi.object().keys({

  email: Joi.string().required().email().messages({
    'string.base': 'email must be a string',
    'string.email': 'email invalid',
    'string.empty': 'email must be filled'
  })

});
export {passwordSchema, emailSchema};
