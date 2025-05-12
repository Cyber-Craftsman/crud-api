import cluster from 'cluster';
import os from 'os';
import http from 'http';
import { app } from './app';

const PORT = parseInt(process.env.PORT || '4000', 10);
const numCPUs = os.availableParallelism
  ? os.availableParallelism()
  : os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 1; i < numCPUs; i++) {
    cluster.fork({ PORT: PORT + i });
  }

  let current = 1;
  const loadBalancer = http.createServer((req, res) => {
    const options = {
      hostname: 'localhost',
      port: PORT + current,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };

    const proxy = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    req.pipe(proxy, { end: true });

    current = current + 1 >= numCPUs ? 1 : current + 1;
  });

  loadBalancer.listen(PORT, () => {
    console.log(`Load balancer running on port ${PORT}`);
  });
} else {
  const workerPort = parseInt(process.env.PORT || '4000', 10);
  app.listen(workerPort, () => {
    console.log(`Worker ${process.pid} listening on port ${workerPort}`);
  });
}
