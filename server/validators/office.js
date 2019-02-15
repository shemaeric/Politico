import Validate from 'celebrate';

const createOffice = {
  body: {
    name: Validate.Joi.string().required().trim(),
    type: Validate.Joi.string().valid(
      'state',
      'local',
      'logislative',
      'government',
    ).required(),
  },
};

const updateOffice = {
  body: {
    name: Validate.Joi.string().trim(),
    hqAdress: Validate.Joi.string().valid(
      'state',
      'local',
      'logislative',
      'government',
    ),
  },
};


export default {
  createOffice,
  updateOffice,
};
