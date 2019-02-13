import express from 'express';
import Party from './controllers/partyController';
import Office from './controllers/officeController';

const app = express();

app.use(express.json());

app.get('/api/v1', (req, res) => {
  res.json({ message: 'Welcome to Politico API' });
});

// create a party
app.post('/api/v1/parties', Party.createPart);
// get all parties
app.get('/api/v1/parties', Party.getParties);
// get a specific party
app.get('/api/v1/parties/:id', Party.getParty);
// update a party
app.patch('/api/v1/parties/:id', Party.updatingParty);
// delete a party
app.delete('/api/v1/parties/:id', Party.deletingParty);
// create office
app.post('/api/v1/offices/', Office.createOf);
// get All offices
app.get('/api/v1/offices/', Office.getOffices);
// get a specific office
app.get('/api/v1/offices/:id', Office.getOffice);
// update an Office
app.patch('/api/v1/offices/:id', Office.updatingOffice);
// delete a office
app.delete('/api/v1/offices/:id', Office.deletingOffice);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

export default app;
