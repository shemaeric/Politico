/* eslint consistent-return: 0 */
/* eslint no-shadow: 0 */
import moment from 'moment';
import officeModel from '../models/officeModel';

const Office = {
/*
* @param {Object} req
* @param {Object} res
* @param {Object} office Object
*/

  createOffice(req, res) {
    if (!req.body.name || !req.body.type) {
      return res.status(400).send({
        status: 400,
        message: 'name and Type could not be empty',
      });
    }

    const office = officeModel.createOffice(req.body);
    const name = officeModel.validateOffice(req.body.name);
    name.then((name) => {
      if (!name) {
        return res.status(400).send({ error: 'Office name already exists' });
      }
    });
    office.then(office => res.status(201).send({
      status: 201,
      message: 'Office Succefully Created',
      data: office,
    })).catch(err => console.log(err));
  },


  /*
* @param {Object} req
* @param {Object} res
* @returns {Object} Offices Array
*/
  getOffices(req, res) {
    const offices = officeModel.findAllOffices();
    offices.then(offices => res.status(200).send({
      status: 200,
      data: offices.rows,
    }));
  },

  /*
* @param {Object} req
* @param {Object} res
* @retuns {Object} office object
*/
  async getOffice(req, res) {
    const office = await officeModel.findOneOffice(req.params.id);
    try {
      if (!office || office.rows.length === 0) {
        return res.status(404).send({
          status: 404,
          message: 'office not found',
        });
      }
      return res.status(200).send({
        status: 200,
        data: office.rows,
      });
    } catch (error) {
      return res.status(404).send({
        status: 404,
        message: 'office not found',
      });
    }
  },

  /*
* @param {Object} req
* @param {Object} res
* @returns {Object} update office
*/
  async updateOffice(req, res) {
    const office = await officeModel.findOneOffice(req.params.id);
    try {
      if (!office || office.rows.length === 0) {
        return res.status(404).send({
          status: 404,
          message: 'office not found',
        });
      }

      const data = [
        req.body.name || office.rows[0].name,
        req.body.type || office.rows[0].type,
        moment(new Date()),
        req.params.id,
      ];

      const updatedOffice = await officeModel.updateOffice(data);
      return res.status(200).send({
        status: 200,
        data: updatedOffice,
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
  async deleteOffice(req, res) {
    const office = await officeModel.findOneOffice(req.params.id);
    if (!office || office.rows.length === 0) {
      return res.status(404).send({
        status: 404,
        message: 'office not found',
      });
    }
    const id = [req.params.id];
    const delet = await officeModel.deleteOffice(id);
    return res.status(200).send({
      status: 200,
      message: 'office deleted',
      data: office.rows[0],
    });
  },

};

export default Office;
