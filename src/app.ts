import http from 'http';
import { router } from './routes/user.routes';

export const app = http.createServer((req, res) => {
  try {
    router(req, res);
  } catch {
    res.writeHead(500);
    res.end('Unexpected error occurred');
  }
});
