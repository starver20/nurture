import express, { request, Request, Response } from 'express';

const router = express.Router();

router.post('/register', (req: Request, res: Response) => {
  res.send({ name: 'amar' });
});

router.post('/login', (req: Request, res: Response) => {
  res.send({ name: 'amar' });
});

router.get('/:userId/advisor', (req: Request, res: Response) => {
  res.send({ name: 'amar' });
});

router.post('/:userId/advisor/:advisorId', (req: Request, res: Response) => {
  res.send({ name: 'amar' });
});

router.get('/:userId/advisor/booking', (req: Request, res: Response) => {
  res.send({ name: 'amar' });
});
export { router as userRouter };
