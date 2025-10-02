import fs from 'fs/promises';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
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


// utils/pdf.ts


export async function generatePDF(content: string, title = 'Resume'): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 12;

  const textLines = content.split('\n');

  let y = height - 50;

  for (const line of textLines) {
    page.drawText(line, {
      x: 50,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    y -= fontSize + 5;
    if (y < 50) {
      // Add new page if needed
      y = height - 50;
      pdfDoc.addPage();
    }
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

