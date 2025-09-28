import express, { Request, Response } from 'express';
import { asyncHandler, BadRequestError, NotFoundError } from 'express-error-toolkit';
import { StatusCodes } from 'http-status-toolkit';
import { User } from '../models/users.model';

const userRouter = express.Router();


// get all users
userRouter.get('/', asyncHandler(async (_req: Request, res: Response) => {
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

// get user by email
userRouter.get('/:uid', asyncHandler(async (req: Request, res: Response) => {
  const { uid } = req.params;
  if(!uid) {
    throw new BadRequestError('Please provide uid');
  }
  const user = await User.findOne({ uid });

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
  '/',
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
