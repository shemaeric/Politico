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
      message: 'Party Succefully Created',
      data: [party],
    });
  },

  /*
* @param {Object} req
* @param {Object} res
* @returns {Object} parties Array
*/
  getAll(req, res) {
    const parties = partyModel.findAll();
    return res.status(200).send({
      status : 200,
      data: [parties]
    })
  }


};

export default Party;
