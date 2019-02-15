import partyModel from '../models/partyModel';

const Party = {
/*
* @param {Object} req
* @param {Object} res
* @param {Object} Party Object
*/

  createParty(req, res) {
    if (!req.body.name || !req.body.hqAdress) {
      return res.status(400).send({
        status: 400,
        message: 'name and HeadQuater Address could not be empty',
      });
    }

    const party = partyModel.createParty(req.body);
    return res.status(201).send({
      status: 201,
      message: 'Party Succefully Created',
      data: party,
    });
  },

  /*
* @param {Object} req
* @param {Object} res
* @returns {Object} parties Array
*/
  getParties(req, res) {
    const parties = partyModel.findAllParties();
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
  getParty(req, res) {
    const party = partyModel.findOneParty(req.params.id);
    if (!party) {
      return res.status(404).send({
        status: 404,
        message: 'party not found',
      });
    }

    return res.status(200).send({
      status: 200,
      data: party,
    });
  },

  /*
* @param {Object} req
* @param {Object} res
* @returns {Object} update party
*/
  updateParty(req, res) {
    const party = partyModel.findOneParty(req.params.id);
    if (!party) {
      return res.status(404).send({
        status: 404,
        message: 'party not found',
      });
    }
    const updatedParty = partyModel.updateParty(req.params.id, req.body);
    return res.status(200).send({
      status: 200,
      data: updatedParty,
    });
  },

  /*
* @param {Object} req
* @param {Object} res
* @returns {Object} return status code and message for deleted
*/
  deleteParty(req, res) {
    const party = partyModel.findOneParty(req.params.id);
    if (!party) {
      return res.status(404).send({
        status: 404,
        message: 'Party not found',
      });
    }

    const del = partyModel.deleteParty(req.params.id);
    return res.status(200).send({
      status: 200,
      message: 'party deleted',
      data: { message: 'party deleted', data: [del] },
    });
  },


};

export default Party;
