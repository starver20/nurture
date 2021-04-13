import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import { Advisor } from '../models/advisor';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send({ msg: 'name, email or password missing' });
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
    return res.status(400).send({ msg: 'email or password missing' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send({ msg: 'incorrect email' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).send({ msg: 'incorrect password' });
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
  const date = req.body.date;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).send({ msg: 'incorrect userId' });
  }

  const advisor = await Advisor.findById(advisorId);
  if (!advisor) {
    return res.status(400).send({ msg: 'incorrect advisorId' });
  }

  let updatedAdvisor = [...user.bookedAdvisor];
  updatedAdvisor.push({ advisor: advisor.id, date: date });

  user.bookedAdvisor = updatedAdvisor;
  user.save();

  res.status(200).send();
};

const getBookedCalls = async (req: Request, res: Response) => {
  const { userId } = req.params;

  let user = await User.findById(userId).populate('bookedAdvisor.advisor');
  if (!user) {
    return res.status(400).send({ msg: 'user not found' });
  }
  console.log(user.bookedAdvisor);
  res.send(user.bookedAdvisor);
};

export { signup, login, getAdvisor, bookCall, getBookedCalls };
