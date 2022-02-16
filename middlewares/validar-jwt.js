const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/usuario.model');




const validarJWT = async ( req = request, res = response, next ) => {

  const token = req.header('x-token');  

  if(!token) 
    return res.status(401).json({
      msg: 'No hay token en la peticion'
    })


    try {
    
    const { uid } = jwt.verify( token , process.env.SECRETORPRIVATEKEY );

    // leer el usuario que corresponda al uid
    const usuarioAutenticado = await User.findById( uid );

    // Validar que usuario existe
    if(!usuarioAutenticado)
      return res.status(401).json({ msg: 'Token no valido - usuario no existe en DB'})

    // Validar que el usuario tenga estado active
    if(!usuarioAutenticado.estado)
      throw new Error();

    req.usuarioAutenticado = usuarioAutenticado;

    
    
    req.uid = uid;


      next(); 
    } catch (error) {
      console.log(error);
      res.status(401).json({
        msg: 'Token no válido'
      })
      
    }

   
}

module.exports = {
  validarJWT,
}