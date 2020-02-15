const http = require('http');
const app = require('./app');
const config = require('./src/utils/config');

const server = http.createServer(app);

server.listen(config.PORT, ()=> console.log(`Server Running on Port ${config.PORT}`));

