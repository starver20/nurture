import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import { Advisor } from '../models/advisor';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send();
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = User.build({ name, email, password: hashed });
  await user.save();

  const token = jwt.sign({ name: user.name, userId: user.id }, 'secrettoken', {
    expiresIn: '1h',
  });

  res.status(200).send({ token: token, userId: user.id });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send();
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send('mail');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).send('password');
  }

  const token = jwt.sign({ name: user.name, userId: user.id }, 'secrettoken', {
    expiresIn: '1h',
  });
  res.status(200).send({ token, userId: user.id });
};

const getAdvisor = async (req: Request, res: Response) => {
  const advisors = await Advisor.find();
  res.status(200).send(advisors);
};

const bookCall = async (req: Request, res: Response) => {
  const { userId, advisorId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(401).send('user');
  }

  const advisor = await Advisor.findById(advisorId);
  if (!advisor) {
    return res.status(401).send('advisor');
  }

  user.booked_advisor.push({ advisorId });

  console.log(user.booked_advisor);
  res.send(user.booked_advisor);
};

export { signup, login, getAdvisor, bookCall };
