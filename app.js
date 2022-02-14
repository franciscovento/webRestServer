require('dotenv').config();

// Module Exports
// Este comentario es para volver hacer deploy
const Server = require('./models/server');


const server = new Server();

server.listen();
