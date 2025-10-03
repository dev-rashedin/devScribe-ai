import express, { Request, Response } from 'express';
import multer from 'multer';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import {
  asyncHandler,
  NotFoundError,
  BadRequestError,
} from 'express-error-toolkit';
import { StatusCodes } from 'http-status-toolkit';
import { client } from '../lib/utils';

const docSummarizerRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

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
      const textResult = await pdf(file.buffer);

      text = textResult?.text
   } else if (
     file.mimetype ===
       'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
     file.mimetype === 'application/msword'
   ) {
     const result = await mammoth.extractRawText({ buffer: file.buffer });
     text = result.value;
   } else if (file.mimetype === 'text/plain') {
     text = file.buffer.toString('utf-8');
   } else {
     throw new BadRequestError('Unsupported file type');
   }
 } else {
   throw new BadRequestError('Please upload a file or provide text');
 }

   text = text?.trim();
   if (!text) throw new BadRequestError('No text found in the document');
    

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
