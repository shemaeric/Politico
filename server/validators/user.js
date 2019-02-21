import Validate from 'celebrate';

const createUser = {
  body: {
    firstname: Validate.Joi.string().required().trim(),
    lastname: Validate.Joi.string().required().trim(),
    othername: Validate.Joi.string().required().trim(),
    email: Validate.Joi.string().required().email().trim(),
    phone: Validate.Joi.string().required().trim(),
    passport: Validate.Joi.string().required().trim(),
    password: Validate.Joi.string().required().trim(),
    isadmin: Validate.Joi.string().required().trim(),
  },
};


export default {
  createUser,
};
