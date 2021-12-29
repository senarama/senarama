import { request, response } from 'express';
import { LOG } from '../config/constants';

const serveGzipped = (req = request, res = response, next = () => {}) => {
  if (req.url.search(/\.(css|js)$/) !== -1) {
    let contentType = 'text/javascript';
    if (req.url.search(/\.js$/i) === -1) {
      contentType = 'text/css';
    }

    req.url = `${req.url}.gz`;
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', contentType);
  }
  LOG(req.url);
  next();
};

export default serveGzipped;
