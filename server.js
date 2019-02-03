import express from 'express';
import Party from './src/usingJSObject/controllers/partyController';

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	return res.status(200).send({
		'message' : 'hello world'
	});
});

// create a party
app.post('/api/v1/parties', Party.create);
// get all parties
app.get('/api/v1/parties', Party.getAll);
//get a specific party
app.get('/api/v1/parties/:id', Party.getOne);
//update a party
app.patch('/api/v1/parties/:id', Party.update);
//delete a party
app.delete('/api/v1/parties/:id', Party.delete);

app.listen(3000)

console.log('app listening to port', 3000);

export default app;