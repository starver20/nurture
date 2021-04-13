import express, { request, Request, Response } from 'express';
import { userController } from '../controllers';

const router = express.Router();

router.post('/register', userController.signup);

router.post('/login', userController.login);

router.get('/:userId/advisor', userController.getAdvisor);

router.post('/:userId/advisor/:advisorId', userController.bookCall);

router.get('/:userId/advisor/booking', userController.getBookedCalls);

export { router as userRouter };
