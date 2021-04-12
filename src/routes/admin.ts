import express, { request, Request, Response } from 'express';
import { adminController } from '../controllers';

const router = express.Router();

router.post('/advisor', adminController.addAdvisor);

export { router as adminRouter };
