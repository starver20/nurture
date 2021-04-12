import { Request, Response, NextFunction } from 'express';
import { Advisor } from '../models/advisor';

const addAdvisor = async (req: Request, res: Response) => {
  const { name, photoURL } = req.body;
  if (!name || !photoURL) {
    return res.status(400).send();
  }
  const advisor = Advisor.build({ name, photoURL });
  await advisor.save();
  res.status(200).send();
};

export { addAdvisor };
