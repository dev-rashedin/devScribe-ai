import express, { Request, Response } from 'express';
import multer from 'multer';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import fs from 'fs/promises';
import {
  asyncHandler,
  NotFoundError,
  BadRequestError,
} from 'express-error-toolkit';
import { StatusCodes } from 'http-status-toolkit';
import { client } from '../lib/utils';

const resumeAssistantRouter = express.Router();
const upload = multer({ dest: 'uploads/resumes' });

resumeAssistantRouter.post(
  '/resume-assistant',
  upload.single('file'),
  asyncHandler(async (req: Request, res: Response) => {
    console.log('request body', req.body);
    console.log('request file', req.file);

    let resumeText = '';

    if (req.body.text && req.body.text.trim().length > 0) {
      resumeText = req.body.text;
    } else if (req.file) {
      const file = req.file;

      if (file.mimetype === 'application/pdf') {
        const data = await fs.readFile(file.path);
       const textResult = await pdf(data);

      resumeText = textResult.text ?? textResult;    
      } else if (
        file.mimetype ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.mimetype === 'application/msword'
      ) {
        const result = await mammoth.extractRawText({ path: file.path });
        resumeText = result.value;
      } else if (file.mimetype === 'text/plain') {
        resumeText = await fs.readFile(file.path, 'utf-8');
      } else {
        throw new BadRequestError('Unsupported file type');
      }
    } else {
      throw new BadRequestError('Please upload a file or provide text');
    }

    if (!resumeText || resumeText.trim().length === 0) {
      throw new BadRequestError('No content found in the resume');
    }

    // optional job description (for tailoring)
    const jobDescription = req.body.jobDescription || '';
    const tone = req.body.tone || 'professional';
    const role = req.body.role || 'general';

    // AI prompt
    const userPrompt = jobDescription
      ? `You are a resume optimization assistant. The user provided their resume and a job description. 
Tailor and improve the resume to match the job description, ensuring it is clear, impactful, and ATS-friendly. 
Resume:\n\n${resumeText}\n\nJob Description:\n\n${jobDescription}\n\nTone: ${tone}\nRole: ${role}`
      : `You are a resume optimization assistant. The user provided their resume. 
Improve it to make it clear, impactful, and ATS-friendly. 
Resume:\n\n${resumeText}\n\nTone: ${tone}\nRole: ${role}`;

    // sending prompt to model
    const response = await client.chat.completions.create({
      model: 'openai/gpt-oss-120b',
      messages: [{ role: 'user', content: userPrompt }],
      temperature: 0.6,
      max_tokens: 1200,
    });

    const optimizedResume = response?.choices[0]?.message?.content;

    if (!optimizedResume) {
      throw new NotFoundError('No resume optimization generated');
    }

    res.status(StatusCodes.OK).json({
      success: true,
      optimizedResume,
      role,
      tone,
      tailored: !!jobDescription,
    });
  })
);

export default resumeAssistantRouter;
