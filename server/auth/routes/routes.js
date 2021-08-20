import { Router } from 'express';
import { generateAccessToken } from '../utils/utils.js';
import { authorize } from '../middlewares/authorization.js';
import { user } from '../models/user.js';
import bcrypt from 'bcrypt';
const route = Router();
route.get('/login', authorize, (req, res) => {
  const { user } = req;
  console.log(user);
});
route.post('/signup', async (req, res) => {
  const { email, password, fName, lName } = req.body;

  ///check if an email and or password is provided
  if (email == null || password == null || fName == null || lName == null)
    return res.status(400).send({ message: 'Please provide all information!' });

  //// find if the user already exist
  const existingUser = await user
    .findOne({
      email,
    })
    .exec();

  ///check if user does exists
  if (existingUser != null)
    return res
      .status(400)
      .send({ message: 'a User with this email already exists.' });

  ///hash the password and add to database
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({
      fName,
      lName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
  } catch {
    return res.status(400).send({ message: 'cannot hash password' });
  }

  return res.status(200).send({ message: 'created new user' });
});

export { route };
