const http = require('http');
const app = require('./app');
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'http://localhost';
const NODE_ENV = process.env.NODE_ENV || 'development';

server.listen(PORT, () => {
  console.log(
    `server is running on ${HOST}:${PORT} in ${NODE_ENV} mode`.bgGreen.black
  );
});
