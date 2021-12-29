import { request, response, Router } from 'express';
import { STATIC_PATH } from '../config/constants';
import serveGzipped from '../middlewares/gzip-content';

const assetRouter = Router();

assetRouter.use(serveGzipped);
assetRouter.get('/*', (req = request, res = response) => {
  res.sendFile(`${STATIC_PATH}${req.path}`);
});

export default assetRouter;
