const { Router } = require('express');
const parseToken = require('../middlewares/parseToken');
const userModel = require('../models/user');
const route = Router();

route.get('/user', parseToken, async (req, res) => {
  if (!req.auth) return res.status(404).send({ message: 'Unauthorized!' });

  console.log('user fetched');
  const currentUser = await userModel.findOne({ email: req.auth.user }).exec();

  if (currentUser == null)
    return res
      .status(404)
      .send({
        message: 'User has been deleted or does not exist!',
        authorized: false,
      });

  res.status(200).send({
    message: 'Logged in',
    authorized: true,
    email: currentUser.email,
    conversations: currentUser.conversations,
    fName: currentUser.fName,
    lName: currentUser.lName,
  });
});

module.exports = route;
