import express, { Request, Response } from 'express';
import { asyncHandler, BadRequestError } from 'express-error-toolkit';
import { StatusCodes } from 'http-status-toolkit';
import { History } from '../models/history.model';

const historyRouter = express.Router();

historyRouter.post(
  '/history',
  asyncHandler(async (req: Request, res: Response) => {
    const { uid, service, messages, title } = req.body;

    if (!uid || !service || !messages || !Array.isArray(messages)) {
      throw new BadRequestError('Please provide uid, service, and messages[]');
    }

  
    const autoTitle =
      title ||
      messages.find((m: any) => m.role === 'user')?.content?.slice(0, 40) ||
      'New Conversation';

    const newHistory = new History({
      uid,
      service,
      title: autoTitle,
      messages,
    });

    await newHistory.save();

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'History saved successfully',
      history: newHistory,
    });
  })
);

export default historyRouter;
