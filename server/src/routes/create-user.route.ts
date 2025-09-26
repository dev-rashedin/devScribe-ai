// createUser.route.ts
import express, { Request, Response } from 'express';
import { asyncHandler, BadRequestError } from 'express-error-toolkit';
import { StatusCodes } from 'http-status-toolkit';
import { User } from '../models/user';

const createUserRouter = express.Router();

createUserRouter.post(
  '/create-user',
  asyncHandler(async (req: Request, res: Response) => {
    const { uid, email, displayName, photoURL } = req.body;

    if (!uid || !email || !displayName) {
      throw new BadRequestError('Please provide uid, email, and displayName');
    }

    // Service logic inline
    let user = await User.findOne({ uid });
    if (!user) {
      user = new User({
        uid,
        email,
        displayName,
        photoURL,
        subscription: 'free',
        role: 'user',
      });
      await user.save();
    }

    res.status(StatusCodes.CREATED).json({
      message: 'User created successfully',
      user,
    });
  })
);

export default createUserRouter;
