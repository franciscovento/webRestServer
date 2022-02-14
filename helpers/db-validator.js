const Role = require('../models/role.model');
const Usuario = require('../models/usuario.model')
const bcrypt = require('bcryptjs');


const esRoleValido = async (rol = '') => {
  const existRole = await Role.findOne({ rol });
  if ( !existRole ) {
        throw new Error(`El rol ${rol} no está registrado en la base de datos`)
  }
} 

const emailExiste = async ( correo = '' ) => {
    // ! Verficar si correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
      throw new Error ( `El correo ${correo} ya existe`)
    }
}

const encriptarPassword = async ( password ) => {
  // ! Encriptar contrasena
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync( password, salt );
}

const usuarioExiste = async( id ) => {
  const usuarioExiste = await Usuario.findById( id );
  if(!usuarioExiste){
    throw new Error( `El id ${id} no existe en la base de datos`);
  }
}

module.exports = { 
  esRoleValido,
  emailExiste,
  encriptarPassword,
  usuarioExiste
}