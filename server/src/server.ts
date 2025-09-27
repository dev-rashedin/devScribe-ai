import app from './app';
import config from './config';
import connectDB from './config/connectDB';


connectDB()


app.listen(config.port, () => {
  console.log(`DevScribe-ai server is running on port http://localhost:${config.port}`);
});
