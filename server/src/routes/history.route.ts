import express, { Request, Response } from 'express';
import { asyncHandler, BadRequestError } from 'express-error-toolkit';
import { StatusCodes } from 'http-status-toolkit';
import { History } from '../models/history.model';

const historyRouter = express.Router();


// fetch history by service and user uid
historyRouter.get(
  '/history/:service/:uid',
  asyncHandler(async (req: Request, res: Response) => {
    const { service, uid } = req.params;

    if (!service || !uid) {
      throw new BadRequestError('Please provide service and uid');
    }

    const history = await History.find({ service, uid }).select({
      title: 1,
      messages: 1
    }).sort({ createdAt: -1 });


    if (!history) {
      throw new BadRequestError('History not found');
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'History fetched successfully',
      history,
    });
  })
);

// fetch history by id
historyRouter.get(
  '/history/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestError('Please provide id');
    }

    const history = await History.findById(id).select({
      title: 1,
      messages: 1
    });

    if (!history) {
      throw new BadRequestError('History not found');
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'History fetched successfully',
      history,
    });
  })
);


// store history in database
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
