import express from 'express';
import config from 'config'
import connect from './utils/connect.mongo';
import logger from './utils/logger';
import health from './routes/health';
import user from './routes/user';
const PORT = config.get<number>('PORT');
const app = express();

app.use(express.json())
health(app);
user(app);
app.listen(PORT, async () => {
  logger.info(`App running at port ${PORT}`);
  
  await connect();
});