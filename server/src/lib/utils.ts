import cors from 'cors';
import OpenAI from 'openai';
import rateLimit from 'express-rate-limit';
import config from '../config';


// cors option
const allowedOrigins = [config.client_url, 'http://localhost:5173'].filter(
  Boolean
);

export const corsOption: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
// rate limit
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
  standardHeaders: true, // return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // disable the `X-RateLimit-*` headers
});


// openai

if (!config.api_key) {
  throw new Error('OPENAI_API_KEY is missing in environment variables');
}

export const client = new OpenAI({
  baseURL: 'https://api.studio.nebius.com/v1/',
  apiKey: config.api_key,
});


