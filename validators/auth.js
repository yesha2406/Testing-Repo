const Joi = require('joi');

exports.signinValidator = async (body) => {
  try {
    let schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    return schema.validateAsync(body);
  } catch (error) {
    return error;
  }
};

exports.signupValidator = async (body) => {
  try {
    let schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    return schema.validateAsync(body);
  } catch (error) {
    return error;
  }
};
