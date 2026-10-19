import http from 'node:http';
import fs from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const host = '127.0.0.1';
const port = 43219;
const origin = `http://${host}:${port}`;
const mime = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.mp4': 'video/mp4'
};
const headers = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow', 'X-Content-Type-Options': 'nosniff' };
const respond = (res, status, body, type = 'text/plain; charset=utf-8') => {
  res.writeHead(status, { ...headers, 'Content-Type': type });
  res.end(body);
};

http.createServer(async (req, res) => {
  let url;
  try { url = new URL(req.url, origin); }
  catch { respond(res, 400, 'Bad request'); return; }

  if (url.pathname === '/__preview/form' && req.method === 'POST') {
    if (req.headers.origin && req.headers.origin !== origin) {
      respond(res, 403, 'Wrong origin');
      return;
    }
    let bytes = 0;
    for await (const chunk of req) {
      bytes += chunk.length;
      if (bytes > 95 * 1024 * 1024) {
        respond(res, 413, JSON.stringify({ errors: [{ message: 'Preview request is too large.' }] }), 'application/json; charset=utf-8');
        return;
      }
    }
    console.log(`Discarded local preview form test (${bytes} bytes).`);
    if (url.searchParams.has('simulate_failure')) {
      respond(res, 503, JSON.stringify({ errors: [{ message: 'Preview failure: the request was not sent. Please try again.' }] }), 'application/json; charset=utf-8');
      return;
    }
    respond(res, 200, JSON.stringify({ ok: true, preview: true }), 'application/json; charset=utf-8');
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    respond(res, 405, 'Method not allowed');
    return;
  }
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); }
  catch { respond(res, 400, 'Bad path'); return; }
  const candidate = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  const extension = path.extname(candidate).toLowerCase();
  if (!candidate.startsWith(root + path.sep) || !mime[extension]) {
    respond(res, 404, 'Not found');
    return;
  }
  try {
    const stat = await fs.stat(candidate);
    if (!stat.isFile()) throw new Error('Not a file');
    res.writeHead(200, { ...headers, 'Content-Type': mime[extension], 'Content-Length': stat.size });
    if (req.method === 'HEAD') res.end();
    else createReadStream(candidate).pipe(res);
  } catch { respond(res, 404, 'Not found'); }
}).listen(port, host, () => console.log(`Layer Zero Labs local website preview: ${origin}`));
