import dotenv from 'dotenv';
dotenv.config();


const config = {
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  nodeEnv: process.env.NODE_ENV || 'development',
  client_url: process.env.CLIENT_URL,
  api_key: process.env.OPENAI_API_KEY,
};

export default config;