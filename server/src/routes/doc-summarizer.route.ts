import express, { Request, Response } from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import fs from 'fs/promises';
import {
  asyncHandler,
  NotFoundError,
  BadRequestError,
} from 'express-error-toolkit';
import { StatusCodes } from 'http-status-toolkit';
import { client } from '../lib/utils';

const docSummarizerRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

docSummarizerRouter.post(
  '/doc-summarizer',
  upload.single('file'),
  asyncHandler(async (req: Request, res: Response) => {
    let text = '';

    if (req.body.text && req.body.text.trim().length > 0) {
      text = req.body.text;
    } else if (req.file) {
      const file = req.file;

      if (file.mimetype === 'application/pdf') {
        const data = await fs.readFile(file.path);
        text = (await pdfParse(data)).text;
      } else if (
        file.mimetype ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.mimetype === 'application/msword'
      ) {
        const result = await mammoth.extractRawText({ path: file.path });
        text = result.value;
      } else if (file.mimetype === 'text/plain') {
        text = await fs.readFile(file.path, 'utf-8');
      } else {
        throw new BadRequestError('Unsupported file type');
      }
    } else {
      throw new BadRequestError('Please upload a file or provide text');
    }

    if (!text || text.trim().length === 0) {
      throw new BadRequestError('No text found in the document');
    }

    console.log('text inside docSummarizer server route', text);
    

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
      summary,
    });
  })
);

export default docSummarizerRouter;
