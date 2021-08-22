import { Router } from 'express';
import { generateAccessToken } from '../utils/utils.js';
import { user } from '../models/user.js';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
const route = Router();
route.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (email == null || password == null)
    return res.status(400).send({ message: 'Please provide all information!' });

  ///find the user in the database
  const signinUser = await user.findOne({ email }).exec();

  ///check if the user does not exists
  if (signinUser == null)
    return res.status(400).send({ message: 'User does not exist.' });

  ///compare passwords
  if (await bcrypt.compare(password, signinUser.password)) {
    //// generate a token for the httpcookie
    const token = generateAccessToken(email, '7d');
    ///set the cookie
    res.cookie('accessCookie', token, {
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: true,
      expires: dayjs().add(7, 'days').toDate(),
    });
    return res.status(200).send({ message: 'Logged in' });
  }

  return res.status(400).send({ message: 'password does not match!' });
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
