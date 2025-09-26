import express, { Request, Response } from 'express';
import {
  asyncHandler,
  NotFoundError,
  BadRequestError,
} from 'express-error-toolkit';
import { StatusCodes } from 'http-status-toolkit';
import { client } from '../lib/utils';

const articleWriterRoute = express.Router();

articleWriterRoute.post(
  '/generate-article',
  asyncHandler(async (req: Request, res: Response) => {
    const { topic } = req.body;

    if (!topic) {
      throw new BadRequestError('Please provide a topic for the article');
    }

    const response = await client.chat.completions.create({
      model: 'openai/gpt-oss-120b',
      messages: [
        {
          role: 'user',
          content: `Write a well-structured article on the following topic:\n\n"${topic}"\n\nThe article should include an introduction, main points, and a conclusion.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1200,
    });

    const article = response?.choices[0]?.message?.content;

    if (!article) {
      throw new NotFoundError('No article generated');
    }

    res.status(StatusCodes.OK).json({
      article,
      topic,
    });
  })
);

export default articleWriterRoute;
