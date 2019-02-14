import express from 'express';
import Party from '../controllers/partyController';
import Office from '../controllers/officeController';

const router = express.Router();

// create a party
router.post('/api/v1/parties', Party.createParty);
// get all parties
router.get('/api/v1/parties', Party.getParties);
// get a specific party
router.get('/api/v1/parties/:id', Party.getParty);
// update a party
router.patch('/api/v1/parties/:id', Party.updateParty);
// delete a party
router.delete('/api/v1/parties/:id', Party.deleteParty);
// create office
router.post('/api/v1/offices/', Office.createOffice);
// get All offices
router.get('/api/v1/offices/', Office.getOffices);
// get a specific office
router.get('/api/v1/offices/:id', Office.getOffice);
// update an Office
router.patch('/api/v1/offices/:id', Office.updateOffice);
// delete a office
router.delete('/api/v1/offices/:id', Office.deleteOffice);

export default router;