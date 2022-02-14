const { response, request } = require('express');
// const bcrypt = require('bcryptjs');


const Usuario = require('../models/usuario.model');
const { encriptarPassword } = require('../helpers/db-validator');

exports.usuariosGet = async ( req = request, res = response) => {

  const { limite = 5, desde = 0 } = req.query;
  // const usuarios = await Usuario.find({ estado: true })
  //   .skip( desde )
  //   .limit( limite )

  // const total = await Usuario.countDocuments({ estado: true });

  const [ total, usuarios ] = await Promise.all([
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true })
        .skip( desde )
        .limit( limite )
  ])

  res.json({
    total,
    current: usuarios.length,
    usuarios
  

  });
};

exports.usuariosPost = async ( req = request, res = response ) => {

  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario( { nombre, correo, password, rol } );

  // ! Encriptar contrasena
  // const salt = bcrypt.genSaltSync();
  // usuario.password = bcrypt.hashSync( password, salt );

  usuario.password = await encriptarPassword(password);

  // ! Guardar en DB
  await usuario.save();

  res.json({ 
    usuario
  });
};

exports.usuariosPut = async ( req = request, res = response ) => {

  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  // Validar contra base de datos
if ( password ) { 
  resto.password = await encriptarPassword(password);
}
  
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    usuario,

  });
};

exports.usuariosDelete = async ( req, res = response ) => {

  const { id } = req.params;

  // Borrar fisicamente
  // const usuario = await Usuario.findByIdAndDelete( id );

  const usuario = await Usuario.findByIdAndUpdate( id, { estado: false} )

  res.json({
    msg: `Se elimino el usuario con id: ${usuario.id}`
  })
}