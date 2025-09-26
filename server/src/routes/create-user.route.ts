import express, { Request, Response } from 'express';
import { asyncHandler, BadRequestError } from 'express-error-toolkit';
import { StatusCodes } from 'http-status-toolkit';
import { User } from '../models/users.model';

const createUserRouter = express.Router();

createUserRouter.post(
  '/create-user',
  asyncHandler(async (req: Request, res: Response) => {
    const { uid, email, displayName, photoURL } = req.body;

    if (!uid || !email || !displayName) {
      throw new BadRequestError('Please provide uid, email, and displayName');
    }

    // checking if user already exists
    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      return res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: 'User already exists',
        user: existingUser,
      });
    }

    // storing user in database
    const newUser = new User({
      uid,
      email,
      displayName,
      photoURL,
      subscription: 'free',
      role: 'user',
    });

    await newUser.save();

   return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'User created successfully',
      user: newUser,
    });
  })
);

export default createUserRouter;
