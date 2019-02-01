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
      status: 200,
      data: [parties],
    });
  },

  /*
* @param {Object} req
* @param {Object} res
* @retuns {Object} party object
*/
  getOne(req, res) {
    const party = partyModel.findOne(req.params.id);
    if (!party) {
      return res.status(404).send({
        status: 404,
        message: 'party not found',
      });
    }

    return res.status(200).send({
      status: 200,
      data: [party],
    });
  },

  /*
* @param {Object} req
* @param {Object} res
* @returns {Object} update party
*/
  update(req, res) {
    const party = partyModel.findOne(req.params.id);
    if (!party) {
      return res.status(404).send({
        status: 404,
        message: 'party not found',
      });
    }
    const updatedParty = partyModel.update(req.params.id, req.body);
    return res.status(200).send({
      status: 200,
      data: [updatedParty],
    });
  },

  /*
* @param {Object} req
* @param {Object} res
* @returns {Object} return status code and message for deleted
*/
  delete(req, res) {
    const party = partyModel.findOne(req.params.id);
    if (!party) {
      return res.status(404).send({
        status: 404,
        message: 'Party not found',
      });
    }

    const del = partyModel.delete(req.params.id);
    return res.status(200).send({
      status: 200,
      message: 'party deleted',
      data: [{ message: 'party deleted', data: [del] }],
    });
  },


};

export default Party;
