import express, { Request, Response } from 'express';
import multer from 'multer';
import {
  asyncHandler,
  NotFoundError,
  BadRequestError,
} from 'express-error-toolkit';
import { StatusCodes } from 'http-status-toolkit';
import { client } from '../lib/utils';
import { extractTextFromRequest } from '../utils';

const docSummarizerRouter = express.Router();
const upload = multer({ dest: 'uploads/documents' });

docSummarizerRouter.post(
  '/doc-summarizer',
  upload.single('file'),
  asyncHandler(async (req: Request, res: Response) => {
  const text = await extractTextFromRequest(req.body, req.file);

    if (!text || text.trim().length === 0) {
      throw new BadRequestError('No text found in the document');
    }
    

    // Summarize with AI
    const response = await client.chat.completions.create({
      model: 'openai/gpt-oss-120b',
      messages: [
        {
          role: 'user',
          content: `Summarize the following document into clear, concise bullet points:\n\n${text}`,
        },
      ],
      temperature: 0.5,
      max_tokens: 600,
    });

    const summary = response?.choices[0]?.message?.content;

    if (!summary) {
      throw new NotFoundError('No summary generated');
    }

    res.status(StatusCodes.OK).json({
      success: true,
      summary,
    });
  })
);

export default docSummarizerRouter;
