import express, { Request, Response } from 'express';
import multer from 'multer';
import {
  asyncHandler,
  NotFoundError,
  BadRequestError,
} from 'express-error-toolkit';
import { StatusCodes } from 'http-status-toolkit';
import { client } from '../lib/utils';
import { extractTextFromRequest, generatePDF } from '../utils';

const resumeAssistantRouter = express.Router();
const upload = multer({ dest: 'uploads/resumes' });

resumeAssistantRouter.post(
  '/resume-assistant',
  upload.single('file'),
  asyncHandler(async (req: Request, res: Response) => {
    console.log('request body', req.body);
    console.log('request file', req.file);
    
    
    const resumeText = await extractTextFromRequest(req.body, req.file);



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

    // const pdfBuffer = await generatePDF(optimizedResume, 'Optimized Resume');

    // Step 5: return
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
