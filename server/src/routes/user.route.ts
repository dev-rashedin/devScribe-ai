import express, { Request, Response } from 'express';
import { asyncHandler, BadRequestError, NotFoundError } from 'express-error-toolkit';
import { StatusCodes } from 'http-status-toolkit';
import { User } from '../models/users.model';

const userRouter = express.Router();


userRouter.get('/users', asyncHandler(async (_req: Request, res: Response) => {
  const users = await User.find();

  if(!users) {
    throw new NotFoundError('Users not found');
  }

  return res.status(StatusCodes.OK).json({
    success: true,
    message: 'Users fetched successfully',
    totalUsers: users.length,
    users,
  });
}));

userRouter.get('/users/:email', asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.params;
  if(!email) {
    throw new BadRequestError('Please provide email');
  }
  const user = await User.findOne({ email });

  if(!user) {
    throw new NotFoundError('User not found');
  }
  return res.status(StatusCodes.OK).json({
    success: true,
    message: 'User fetched successfully',
    user,
  });
 }))

userRouter.post(
  '/create-user',
  asyncHandler(async (req: Request, res: Response) => {
    const { uid, email, displayName, photoURL } = req.body;

    if (!uid || !email || !displayName) {
      throw new BadRequestError('Please provide uid, email, and displayName');
    }

    // checking if user already exists
    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      return res.status(StatusCodes.OK).json({
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

export default userRouter;
