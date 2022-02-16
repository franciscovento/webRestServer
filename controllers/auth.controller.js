const bcryptjs = require('bcryptjs');
const { request, response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario.model');

const loginController = async (req = request, res = response) => {

  const { correo, password } = req.body;

  try {
    // Verificar si el Email existe
    const usuario = await Usuario.findOne({ correo });
    if( !usuario ) {
      return res.status(400).json( {
        msg: 'Usuario / Passowrd no son correctos - correo'
      })
    }


    // Verificar si el usuario esta activo en la base de datos
    if( !usuario.estado ){
      return res.status(400).json({
        msg: 'Usuario / Password no son correcto - estado:false'
      })
    }

    // Verificar la contrasena
    const validPassword = bcryptjs.compareSync( password, usuario.password );
    if(!validPassword){
      return res.status(400).json({
        msg: 'Usuario / Password no son correcto - password'
      })
    }


    // Generar el JWT
    const token = await generarJWT( usuario.id );

    res.json({
      usuario,
      token
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Algo salió mal'
    })
    
  }



}


module.exports = {
  loginController,
}