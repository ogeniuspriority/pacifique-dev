const Joi = require('joi');
const validationHelper = require('../helpers/ValidationHelper.js');

const checkSignIn = (req, res, next) => {
  const signInSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const schemasValidation = Joi.validate(req.body, signInSchema);
  validationHelper(res, schemasValidation, next);
};
module.exports = checkSignIn;
