import Validate from 'celebrate';

const createParty = {
  body: {
    name: Validate.Joi.string().required().trim(),
    hqAdress: Validate.Joi.string().required().trim(),
    logoUrl: Validate.Joi.string().required().trim(),
  },
};

const updateParty = {
  body: {
    name: Validate.Joi.string().trim(),
    hqAdress: Validate.Joi.string().trim(),
    logoUrl: Validate.Joi.string().trim(),
  },
};


export default {
  createParty,
  updateParty,
};
