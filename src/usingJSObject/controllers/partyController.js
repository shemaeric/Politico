import partyModel from '../models/partyModel';

const Party = {
/*
* @param {Object} req
* @param {Object} res
* @param {Object} Party Object
*/

  create(req, res) {
    if (!req.body.name || !req.body.hqAdress) {
      return res.status(400).send({
        status: 400,
        message: 'name and HeadQuater Address could not be empty',
      });
    }

    const party = partyModel.create(req.body);
    return res.status(201).send({
      status: 201,
      data: [party],
    });
  },

};

export default Party;
