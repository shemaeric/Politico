import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.status(200).send({
  message: 'hello world',
}));

app.listen(3000);

// console.log('app listening to port', 3000);
