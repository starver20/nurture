import { Request, Response, NextFunction } from 'express';
import { Advisor } from '../models/advisor';

const addAdvisor = async (req: Request, res: Response) => {
  const { name, photoURL } = req.body;
  if (name === undefined || photoURL === undefined) {
    return res.status(400);
  }
  const advisor = Advisor.build({ name, photoURL });
  await advisor.save();
  res.status(200);
};
