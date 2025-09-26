import { Request, Response } from 'express';
import express from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from 'express-error-toolkit';
import config from '../config';
import { StatusCodes } from 'http-status-toolkit';

const authRouter = express.Router();

authRouter.post('/jwt', (req: Request, res: Response) => {
  const user = req.body;

  if (!user || !user.email) {
    throw new BadRequestError('User data and email are required');
  }

  const token = jwt.sign(user, config.accessTokenSecret as string, {
    expiresIn: '7d',
  });

  res.status(StatusCodes.OK).send({ token });
});

export default authRouter;
