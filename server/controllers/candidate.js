import candidate from '../models/candidate';
import officeModel from '../models/officeModel';
import moment from 'moment';

const Candidate = {
/*
* @param {Object} req
* @param {Object} res
* @param {Object} office Object
*/

  async createCandidate(req, res) {
    const office = await officeModel.findOneOffice(req.params.id);
    try {
      if (!office || office.rows.length === 0) {
        return res.status(404).send({
          status: 404,
          message: 'office not found',
        });
      }

      const data = [
        req.body.candidate,
        req.body.id,
      ];

      const candid = await candidate.createCandidate(data);
      console.log(candid);
      return res.status(201).send({
        status: 201,
        data: [{
          office : candid.office,
          user : candid.candidate,
        }],
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: 500,
        message: 'Error While updating',
      });
    }
  },
}

export default Candidate;