import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const cwd = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const port = Number(process.argv[3] || process.env.PORT || 4173);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

const server = http.createServer((request, response) => {
  const url = new URL(request.url || '/', `http://localhost:${port}`);
  const decoded = decodeURIComponent(url.pathname);
  const requestedPath = decoded === '/' ? '/index.html' : decoded;
  const target = path.resolve(cwd, `.${requestedPath}`);

  if (!target.startsWith(cwd)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  fs.stat(target, (statError, stats) => {
    const filePath = !statError && stats.isDirectory() ? path.join(target, 'index.html') : target;
    fs.readFile(filePath, (readError, data) => {
      if (readError) {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Not found');
        return;
      }
      response.writeHead(200, {
        'Content-Type': types[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': 'no-store'
      });
      response.end(data);
    });
  });
});

server.listen(port, () => {
  const root = path.relative(path.dirname(fileURLToPath(import.meta.url)), cwd) || '.';
  console.log(`Evolution 20 Gym preview running at http://localhost:${port}/ (${root})`);
});
