import express, { request, Request, Response } from 'express';

const router = express.Router();

router.post('/advisor', (req: Request, res: Response) => {
  res.send({ name: 'amar' });
});

export { router as adminRouter };
