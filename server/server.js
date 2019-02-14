import express from 'express';
import routers from './routes/route.js';

const app = express();

app.use(express.json());
app.use(routers);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

export default app;
