const Joi = require('joi');
const validationHelper = require('../helpers/ValidationHelper.js');

const checkSignUp = (req, res, next) => {
  const signUpSchema = Joi.object().keys({
    name: Joi.string().trim().max(255).required(),
    email: Joi.string()
      .required()
      .trim()
      .regex(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
      .error(() => ({
        message: 'email is not valid',
      })),
    phone: Joi.string()
      .regex(/^[+]2507[238]\d{7}?/)
      .required()
      .error(() => ({
        message: 'phone number format +2507xxxxxxxx',
      })),
    gender: Joi.string().required().valid('Female', 'Male'),
    password: Joi.string()
      .required()
      .trim()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
      .error(() => ({
        message: 'password: 1Capital, 1Small, 1Number, 1Character',
      })),
    profile: Joi.string().allow(''),
  });
  const schemasValidation = Joi.validate(req.body, signUpSchema);
  validationHelper(res, schemasValidation, next);
};
module.exports = checkSignUp;
