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

     const file = req.file;
     if (!file) return res.status(400).send('No file uploaded');

     let text = '';
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
       return res.status(400).send('Unsupported file type');
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

export default docSummarizerRouter;
