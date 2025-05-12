import http from 'http';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../services/user.service';
import { isValidUUID, isValidUserBody } from '../utils/validate';

export async function userController(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  const urlParts = req.url?.split('/') || [];
  const method = req.method || '';
  const id = urlParts[3];

  if (urlParts[1] !== 'api' || urlParts[2] !== 'users') return;

  if (method === 'GET' && urlParts.length === 3) {
    const users = getAllUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
    return;
  }

  if (method === 'GET' && urlParts.length === 4) {
    if (!isValidUUID(id)) {
      res.writeHead(400);
      res.end('Invalid UUID');
      return;
    }

    const user = getUserById(id);
    if (!user) {
      res.writeHead(404);
      res.end('User not found');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
    return;
  }

  if (method === 'POST' && urlParts.length === 3) {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        if (!isValidUserBody(parsed)) {
          res.writeHead(400);
          res.end('Invalid user data');
          return;
        }

        const user = createUser(parsed);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      } catch {
        res.writeHead(400);
        res.end('Invalid JSON');
      }
    });
    return;
  }

  if (method === 'PUT' && urlParts.length === 4) {
    if (!isValidUUID(id)) {
      res.writeHead(400);
      res.end('Invalid UUID');
      return;
    }

    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        if (!isValidUserBody(parsed)) {
          res.writeHead(400);
          res.end('Invalid user data');
          return;
        }

        const updated = updateUser(id, parsed);
        if (!updated) {
          res.writeHead(404);
          res.end('User not found');
          return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updated));
      } catch {
        res.writeHead(400);
        res.end('Invalid JSON');
      }
    });
    return;
  }

  if (method === 'DELETE' && urlParts.length === 4) {
    if (!isValidUUID(id)) {
      res.writeHead(400);
      res.end('Invalid UUID');
      return;
    }

    const deleted = deleteUser(id);
    if (!deleted) {
      res.writeHead(404);
      res.end('User not found');
      return;
    }

    res.writeHead(204);
    res.end();
    return;
  }
}
