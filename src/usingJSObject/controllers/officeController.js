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
  }

};

export default Office;
