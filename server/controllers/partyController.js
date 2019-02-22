/* eslint consistent-return: 0 */
/* eslint no-shadow: 0 */
import moment from 'moment';
import dotenv from 'dotenv';
import partyModel from '../models/partyModel';

dotenv.config();

const Party = {
/*
* @param {Object} req
* @param {Object} res
* @param {Object} Party Object
*/

  async createParty(req, res) {
    if (!req.body.name || !req.body.hqAdress) {
      return res.status(400).send({
        status: 400,
        message: 'name and HeadQuater Address could not be empty',
      });
    }
    try {
      const name = await partyModel.validateParty([req.body.name]);
      const party = await partyModel.createParty(req.body);
      if (name) {
        return res.send({ error: 'Party name already exists' });
      }
      res.status(201).send({
        status: 201,
        message: 'The Party is created successfully',
        data: party,
      });
    } catch (error) {
      res.send(error);
    }
  },

  /*
* @param {Object} req
* @param {Object} res
* @returns {Object} parties Array
*/
  getParties(req, res) {
    const parties = partyModel.findAllParties();
    parties.then(parties => res.status(200).send({
      status: 200,
      data: parties.rows,
    }));
  },

  /*
* @param {Object} req
* @param {Object} res
* @retuns {Object} party object
*/
  async getParty(req, res) {
    const party = await partyModel.findOneParty(req.params.id);
    try {
      if (!party || party.rows.length === 0) {
        return res.status(404).send({
          status: 404,
          message: 'party not found',
        });
      }
      return res.status(200).send({
        status: 200,
        data: party.rows,
      });
    } catch (error) {
      return res.status(404).send({
        status: 404,
        message: 'party not found',
      });
    }
  },

  /*
* @param {Object} req
* @param {Object} res
* @returns {Object} update party
*/
  async updateParty(req, res) {
    const party = await partyModel.findOneParty(req.params.id);
    try {
      if (!party || party.rows.length === 0) {
        return res.status(404).send({
          status: 404,
          message: 'party not found',
        });
      }

      const data = [
        req.body.name || party.rows[0].name,
        req.body.hqAdress || party.rows[0].hqadress,
        req.body.logUurl || party.rows[0].logourl,
        moment(new Date()),
        req.params.id,
      ];

      const updatedParty = await partyModel.updateParty(data);
      return res.status(200).send({
        status: 200,
        data: updatedParty,
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: 'Error While updating',
      });
    }
  },

  /*
* @param {Object} req
* @param {Object} res
* @returns {Object} return status code and message for deleted
*/
  async deleteParty(req, res) {
    const party = await partyModel.findOneParty(req.params.id);
    if (!party || party.rows.length === 0) {
      return res.status(404).send({
        status: 404,
        message: 'party not found',
      });
    }
    const id = [req.params.id];
    const delet = await partyModel.deleteParty(id);
    return res.status(200).send({
      status: 200,
      message: 'party deleted',
      data: party.rows[0],
    });
  },


};

export default Party;
