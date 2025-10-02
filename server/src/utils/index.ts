import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { PDFDocument, rgb } from 'pdf-lib';
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

export async function generatePDF(
  content: string,
  title = 'Resume'
): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage();
  const { height } = page.getSize();

  const fontPath = path.resolve('./fonts/NotoSans-Regular.ttf'); // make sure you have this font
  const fontBytes = fs.readFileSync(fontPath);
  const font = await pdfDoc.embedFont(fontBytes);

  const fontSize = 12;
  const margin = 50;
  const lineHeight = fontSize + 5;

  const textLines = content.split('\n');
  let y = height - margin;

  for (const line of textLines) {
    // Add new page if we reach the bottom
    if (y < margin) {
      page = pdfDoc.addPage();
      y = height - margin;
    }

    page.drawText(line, {
      x: margin,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= lineHeight;
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
