import mongoose from "mongoose";
import config from 'config';
import logger from "./logger";

const MONGODB_URI = config.get<string>('MONGODB_URI');

async function connect():Promise<any> {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info('DB Connected');
  } catch(error) {
    logger.error('Could not connect to DB');
    process.exit(1);
  }
}

export default connect