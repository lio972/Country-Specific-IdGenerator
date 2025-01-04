const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Serve static files
  if (req.url === '/') {
    serveFile(res, './static/index.html', 'text/html');
    return;
  }

  // Serve JSON data directly
  if (req.url === '/data/countries_cities.json') {
    serveFile(res, './data/countries_cities.json', 'application/json');
    return;
  }

  // Serve other static files
  const filePath = '.' + req.url;
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
  };
  serveFile(res, filePath, mimeTypes[extname] || 'application/octet-stream');
});

function serveFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(500);
        res.end('Server error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
}

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
