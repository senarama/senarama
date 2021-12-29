import path from 'path';
import { config } from 'dotenv';
// load .env file
config();

export const PORT = process.env.PORT || 5411;
export const ROOT = path.resolve('.');
export const PUBLIC_PATH = path.resolve('.', 'dist/public');
export const STATIC_PATH = path.resolve('.', 'dist/public/static');
export const LOG = process.env.NODE_ENV === 'production' ? () => {} : console.log;
