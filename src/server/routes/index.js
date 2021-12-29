import { response, Router } from 'express';
import { PUBLIC_PATH } from '../config/constants';
import assetRouter from './asset';

const router = Router();

// static assets
router.use('/static', assetRouter);

// support for react-router
router.get('/*', (req, res = response) => {
  res.sendFile(`${PUBLIC_PATH}/index.html`);
});

export default router;
