const app = require('express')();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

///connect to mongodb database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to mongodb!');
  })
  .catch((e) => {
    console.log(e);
  });

app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Get success' });
});

app.listen(8000, () => {
  console.log('auth server is listening on port 8000');
});
