import officeModel from '../models/officeModel';

const Office = {
/*
* @param {Object} req
* @param {Object} res
* @param {Object} office Object
*/

  create(req, res) {
    if (!req.body.name || !req.body.type) {
      return res.status(400).send({
        status: 400,
        message: 'name and Office Type could not be empty',
      });
    }

    const office = officeModel.create(req.body);
    return res.status(201).send({
      status: 201,
      message: 'Office Succefully Created',
      data: [office],
    });
  },

  /*
* @param {Object} req
* @param {Object} res
* @returns {Object} Offices Array
*/
  getAll(req, res) {
    const offices = officeModel.findAll();
    return res.status(200).send({
      status: 200,
      data: [offices],
    });
  },

  /*
* @param {Object} req
* @param {Object} res
* @retuns {Object} office object
*/
  getOne(req, res) {
    const office = officeModel.findOne(req.params.id);
    if (!office) {
      return res.status(404).send({
        status: 404,
        message: 'office not found',
      });
    }

    return res.status(200).send({
      status: 200,
      data: [office],
    });
  },

  /*
* @param {Object} req
* @param {Object} res
* @returns {Object} update office
*/
  update(req, res) {
    const office = officeModel.findOne(req.params.id);
    if (!office) {
      return res.status(404).send({
        status: 404,
        message: 'office not found',
      });
    }
    const updatedOffice = officeModel.update(req.params.id, req.body);
    return res.status(200).send({
      status: 200,
      data: [updatedOffice],
    });
  },

   /*
* @param {Object} req
* @param {Object} res
* @returns {Object} return status code and message for deleted
*/
  delete(req, res) {
    const office = officeModel.findOne(req.params.id);
    if (!office) {
      return res.status(404).send({
        status: 404,
        message: 'Office not found',
      });
    }

    const del = officeModel.delete(req.params.id);
    return res.status(200).send({
      status: 200,
      data: [{ message: 'office deleted', data: [del] }],
    });
  },

};

export default Office;
