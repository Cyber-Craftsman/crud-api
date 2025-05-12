import http from 'http';
import { userController } from '../controllers/user.controller';

export async function router(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  const url = req.url || '';

  if (url.startsWith('/api/users')) {
    await userController(req, res);
    return;
  }

  res.writeHead(404);
  res.end('Route not found');
}
