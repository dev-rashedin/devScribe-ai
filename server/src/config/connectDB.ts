import mongoose from 'mongoose';
import config from './';


const connectDB = async () => {
  try {
    await mongoose.connect(config.mongo_uri as string);
    console.log('✅ Connected to MongoDB');
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('❌ MongoDB connection failed:', err.message);
    } else {
      console.error('❌ MongoDB connection failed:', err);
    }
    process.exit(1);
  }
};

export default connectDB;
