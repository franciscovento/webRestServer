const express = require('express');
const cors = require('cors');

const userRoutes =  require('../routes/user.routes');
const { dbConnection } = require('../database/config');

class  Server {

  constructor(){
    this.app = express();
    this.port = process.env.PORT,
    this.usuariosPath = '/api/usuarios';
    
    // Connect to DataBase
    this.conectarDb();

    // Middlewares
    this.middlewares();

    // Rutas de app
    this.routes();

    }

    async conectarDb() {
      await dbConnection();
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