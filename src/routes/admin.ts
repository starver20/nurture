import express, { request, Request, Response } from 'express';
import { Advisor } from '../models/advisor';

const router = express.Router();

router.post('/advisor', async (req: Request, res: Response) => {
  const { name, photoURL } = req.body;
  if (!name || !photoURL) {
    return res.status(400).send();
  }
  const advisor = Advisor.build({ name, photoURL });
  await advisor.save();
  return res.status(200).send();
});

export { router as adminRouter };
