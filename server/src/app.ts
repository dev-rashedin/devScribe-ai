import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { notFoundHandler, globalErrorHandler } from 'express-error-toolkit';
import { StatusCodes } from 'http-status-toolkit';
import helmet from 'helmet';

import codeAnalyzerRouter from './routes/code-analyze.route';
import codeRefactorRouter from './routes/code-refactor.route';
import { corsOption, limiter } from './lib/utils';
import articleWriterRoute from './routes/article-writer.route';

const app = express();

// security middleware
app.use(helmet());
app.use(cors(corsOption));
app.use(limiter);

console.log('cors option', corsOption);


// body parser
app.use('/jwt', authRouter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api', codeAnalyzerRouter);
app.use('/api', codeRefactorRouter);
app.use('/api', articleWriterRoute);

// home route
app.get('/', (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Server is running',
  });
});

// not found handler and global error handler
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
