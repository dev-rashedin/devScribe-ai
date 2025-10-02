import { client } from '../lib/utils';
import express, { Request, Response } from 'express';
import {
  asyncHandler,
  NotFoundError,
  BadRequestError,
} from 'express-error-toolkit';
import { StatusCodes } from 'http-status-toolkit';

const codeRefactorRouter = express.Router();

codeRefactorRouter.post(
  '/refactor-code',
  asyncHandler(async (req: Request, res: Response) => {
    const { code, language } = req.body;

    if (!code || !language) {
      throw new BadRequestError('Please provide code and language');
    }

    const response = await client.chat.completions.create({
      model: 'openai/gpt-oss-120b',
      messages: [
        {
          role: 'user',
          content: `Please refactor this ${language} code to be optimized, cleaner, and follow best practices:\n\n\`\`\`${language}\n${code}\n\`\`\``,
        },
      ],
      temperature: 0.3,
      max_tokens: 800,
    });

    const refactoredCode = response?.choices[0]?.message?.content;

    if (!refactoredCode) {
      throw new NotFoundError('No refactored code found');
    }

    res.status(StatusCodes.OK).json({
      success: true,
      refactoredCode,
      language,
    });
  })
);

export default codeRefactorRouter;
