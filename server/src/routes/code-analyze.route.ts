import express, { Request, Response } from 'express';
import {
  asyncHandler,
  NotFoundError,
  BadRequestError,
} from 'express-error-toolkit';
import { StatusCodes } from 'http-status-toolkit';
import { client } from '../lib/utils';

const codeAnalyzerRouter = express.Router();

codeAnalyzerRouter.post(
  '/explain-code',
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
          content: `Please explain this ${language} code in simple terms:\n\n\`\`\`${language}\n${code}\n\`\`\``,
        },
      ],
      temperature: 0.3,
      max_tokens: 800,
    });

    const explanation = response?.choices[0]?.message?.content;

    if (!explanation) {
      throw new NotFoundError('No explanation found');
    }

    res.status(StatusCodes.OK).json({
      success: true,
      explanation,
      language,
    });
  })
);

export default codeAnalyzerRouter;
