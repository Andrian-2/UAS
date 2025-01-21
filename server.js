// Import modul http dari Node.js
const http = require('http');

// Menentukan hostname dan port
const hostname = '127.0.0.1';
const port = 3000;

// Membuat server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

// Menjalankan server
server.listen(port, hostname, () => {
  console.log(`Server berjalan di http://${hostname}:${port}/`);
});
