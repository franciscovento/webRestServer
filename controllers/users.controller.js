const { response, request } = require('express');

exports.usuariosGet = ( req = request, res = response) => {

  const { q, nombre, apikey } = req.query;


  res.json({
    msg: 'get Api from controller',
    q,
    nombre, 
    apikey
  });
};

exports.usuariosPost = ( req = request, res = response ) => {

  const { nombre, edad } = req.body;

  res.json({
    msg: 'post Api from controller', 
    nombre, 
    edad
  });
};

exports.usuariosPut = ( req = request, res = response ) => {


  const id = req.params.id;

  res.json({
    msg: 'put Api from controller',
    id 

  });
};

exports.usuariosDelete = ( req, res = response ) => {
  res.json({
    msg: 'delete Api from controller'
  })
}