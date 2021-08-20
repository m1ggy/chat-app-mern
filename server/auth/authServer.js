import express from 'express';
import cors from 'cors';
import pkg from 'mongoose';
import dotenv from 'dotenv';
import { route } from './routes/routes.js';

const app = express();
const { connect } = pkg;
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(route);
///connect to mongodb database
connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('connected to mongodb!');
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(8000, () => {
  console.log('auth server is listening on port 8000');
});

app.get('/', (req, res) => {
  res.status(200).send({ message: 'get success' });
});
