import express from 'express';
import cors from 'cors';
import { LOG, PORT } from './config/constants';
import router from './routes';

// create express server
const server = express();

// middlewares
server.use(cors());

// router
server.use(router);

// start server
server.listen(PORT, () => {
  LOG(`Server running on http://localhost:${PORT}`);
});
