import express from 'express';
import { celebrate } from 'celebrate';
import Party from '../controllers/partyController';
import Office from '../controllers/officeController';
import validateParty from '../validators/party';
import validateOffice from '../validators/office';
import User from '../controllers/users';
import validateUser from '../validators/user';
import Candidate from '../controllers/candidate';

const router = express.Router();

// Home
router.get('/api/v1', (req, res) => {
  res.send({ message: 'Welcome to Politico API' });
});
// create a party
router.post('/api/v1/parties',
  celebrate(validateParty.createParty), Party.createParty);
// get all parties
router.get('/api/v1/parties', Party.getParties);
// get a specific party
router.get('/api/v1/parties/:id', Party.getParty);
// update a party
router.patch('/api/v1/parties/:id', celebrate(validateParty.updateParty), Party.updateParty);
// delete a party
router.delete('/api/v1/parties/:id', Party.deleteParty);
// // create office
// router.post('/api/v1/offices/', celebrate(validateOffice.createOffice), Office.createOffice);
// // get All offices
// router.get('/api/v1/offices/', Office.getOffices);
// // get a specific office
// router.get('/api/v1/offices/:id', Office.getOffice);
// // update an Office
// router.patch('/api/v1/offices/:id', celebrate(validateOffice.updateOffice), Office.updateOffice);
// // delete a office
// router.delete('/api/v1/offices/:id', Office.deleteOffice);

// create a user
router.post('/api/v1/signup', celebrate(validateUser.createUser), User.register);

// create a user
router.post('/api/v1/signin', User.login);

// create candidate
router.post('/api/v1/offices/:id/register', Candidate.createCandidate);

export default router;
