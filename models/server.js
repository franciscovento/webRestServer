const express = require('express');
const cors = require('cors');

const userRoutes =  require('../routes/user.routes');

class  Server {

  constructor(){
    this.app = express();
    this.port = process.env.PORT || 80,
    this.usuariosPath = '/api/usuarios';
  
    // Middlewares
    this.middlewares();

    // Rutas de app
    this.routes();

    }

    middlewares() {

      //Cors
      this.app.use( cors() );

      // Lectura y parse del body
      this.app.use( express.json() );

      // directorio público
      this.app.use( express.static('public'));

    }

    routes() {
      this.app.use(this.usuariosPath, userRoutes)
    }

    listen(){
      this.app.listen( this.port, () => {
        console.log('Servidor corriendo en puerto ' + this.port);
      });
    }
}

module.exports = Server;