import fs from 'fs/promises';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { BadRequestError } from 'express-error-toolkit';


export async function extractTextFromRequest(
  body: any,
  file?: Express.Multer.File
): Promise<string> {
  // directing text input
  if (body.text && body.text.trim().length > 0) {
    return body.text;
  }

  //  uploading file
  if (file) {
    if (file.mimetype === 'application/pdf') {
      const data = await fs.readFile(file.path);
      return (await pdfParse(data)).text;
    }

    if (
      file.mimetype ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.mimetype === 'application/msword'
    ) {
      const result = await mammoth.extractRawText({ path: file.path });
      return result.value;
    }

    if (file.mimetype === 'text/plain') {
      return await fs.readFile(file.path, 'utf-8');
    }

    throw new BadRequestError('Unsupported file type');
  }

  throw new BadRequestError('Please upload a file or provide text');
}
