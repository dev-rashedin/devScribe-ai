import express, { Request, Response } from 'express';
import {
  asyncHandler,
  NotFoundError,
  BadRequestError,
} from 'express-error-toolkit';
import { StatusCodes } from 'http-status-toolkit';
import { client } from '../lib/utils';

const emailHelperRouter = express.Router();

emailHelperRouter.post(
  '/email-helper',
  asyncHandler(async (req: Request, res: Response) => {
    const { prompt, tone } = req.body;

    if (!prompt) {
      throw new BadRequestError('Please provide a prompt for the email');
    }

    const response = await client.chat.completions.create({
      model: 'openai/gpt-oss-120b',
      messages: [
        {
          role: 'user',
          content: `Write an email with the following request:\n\n"${prompt}"\n\nThe email should include a subject line and body, written in a ${
            tone || 'professional'
          } tone.`,
        },
      ],
      temperature: 0.6,
      max_tokens: 800,
    });

    const email = response?.choices[0]?.message?.content;

    if (!email) {
      throw new NotFoundError('No email generated');
    }

    res.status(StatusCodes.OK).json({
      success: true,
      email,
      prompt,
      tone: tone || 'professional',
    });
  })
);



export default emailHelperRouter;