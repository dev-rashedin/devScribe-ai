import dotenv from 'dotenv';
dotenv.config();


const config = {
  port: process.env.PORT || 3000,
  client_url: process.env.CLIENT_URL,
  mongo_uri: process.env.MONGO_URI,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  nodeEnv: process.env.NODE_ENV || 'development',
  api_key: process.env.OPENAI_API_KEY,
};

export default config;