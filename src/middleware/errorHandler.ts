import http from 'http';

export function handleServerError(
  res: http.ServerResponse,
  message = 'Internal Server Error'
) {
  res.writeHead(500);
  res.end(message);
}
