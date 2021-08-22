const { Router } = require('express');
const parseToken = require('../middlewares/parseToken');
const userModel = require('../models/user');
const route = Router();

route.get('/user', parseToken, async (req, res) => {
  if (!req.auth) return res.status(404).send({ message: 'Unauthorized!' });

  const currentUser = await userModel.findOne({ email: req.auth.user }).exec();

  res.status(200).send({
    message: 'Logged in',
    authorized: true,
    email: currentUser.email,
    conversations: currentUser.conversations,
  });
});

module.exports = route;
