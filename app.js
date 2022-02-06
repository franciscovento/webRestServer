require('dotenv').config();

// Module Exports
const Server = require('./models/server');


const server = new Server();

server.listen();
