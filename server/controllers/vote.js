import moment from 'moment';
import votes from '../models/vote';

const Vote = {
/*
* @param {Object} req
* @param {Object} res
* @param {Object} office Object
*/

  async createVote(req, res) {
    try {
      const data = [
        req.body.candidate,
        req.body.office,
        req.body.user,
      ];

      const vote = await votes.createVote(data);
      if (!vote) {
        return res.status(400).send({
          status: 400,
          error: 'A vote would not be Perfomed',
        });
      }
      return res.status(201).send({
        status: 201,
        data: [{
          candidate: vote.candidate,
          office: vote.office,
          user: vote.users,

        }],
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: 'Error While Voting',
      });
    }
  },
};

export default Vote;
