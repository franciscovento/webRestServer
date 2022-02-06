const { Router } = require('express');
const { usuariosGet,
        usuariosPost,
        usuariosDelete,
        usuariosPut } = require('../controllers/users.controller');

const router = Router();

router.get('/', usuariosGet )
      .post( '/', usuariosPost )
      .delete( '/:id', usuariosDelete )
      .put( '/:id', usuariosPut )

module.exports = router; 