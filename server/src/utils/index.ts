import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { PDFDocument, rgb } from 'pdf-lib';
import { BadRequestError } from 'express-error-toolkit';
import fontkit from '@pdf-lib/fontkit';



export async function generatePDF(
  content: string,
  title = 'Resume'
): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();

  // Register fontkit for custom fonts
  pdfDoc.registerFontkit(fontkit);

  // Load custom font
  const fontPath = path.resolve('./server/fonts/NotoSans-Regular.ttf');
  const fontBytes = await fs.readFile(fontPath);
  const font = await pdfDoc.embedFont(fontBytes);

  const page = pdfDoc.addPage();
  const { height } = page.getSize();
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
      page = pdfDoc.addPage();
      y = height - 50;
    }
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}