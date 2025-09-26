import express from 'express';
import { generateJwtToken } from '../controllers/auth.controller';
import { BadRequestError } from 'express-error-toolkit';

const authRouter = express.Router();

authRouter.post('/', (req: Request, res: Response) => {
  const user = req.body;

  if (!user || !user.email) {
    throw new BadRequestError('User data and email are required');
  }

  const token = jwt.sign(user, config.accessTokenSecret as string, {
    expiresIn: '7d',
  });

  res.status(StatusCodes.OK).send({ token });
};);

export default authRouter;
