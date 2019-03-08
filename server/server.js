import express from 'express';
import dotenv from 'dotenv';
import routers from './routes/route';
import joiErrors from './middlewares/joiErrors';


dotenv.config(); // Sets environment's varibles

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routers);

// use celebrate middleware to handle joi errors
app.use(joiErrors());

app.use('*', (req, res) => res.status(404).send({
  status: 404,
  message: 'URL NOT FOUND',
}));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

export default app;
