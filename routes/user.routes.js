const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet,
        usuariosPost,
        usuariosDelete,
        usuariosPut } = require('../controllers/users.controller');
        
const { esRoleValido, emailExiste, usuarioExiste } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet )
      
router.post( '/',[
         check('nombre', 'El nombre es obligatorio').not().isEmpty(),
         check('password', 'El password debe ser de más de 6 letras').isLength({ min: 6 }),
         check('correo', 'El correo no es válido').isEmail(),
         check('correo').custom( emailExiste ),
      //    check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE'])
        check('rol').custom( esRoleValido )
      ], validarCampos,
         usuariosPost )

router.delete( '/:id',[
      check('id', "No es un ID valido").isMongoId(),
      check('id').custom( usuarioExiste ),
      validarCampos,
      ], usuariosDelete )
      
router.put( '/:id', [
        check('id', "No es un ID valido").isMongoId(),
        check('id').custom( usuarioExiste ),
        check('rol').custom( esRoleValido ),
      ], validarCampos,
         usuariosPut )

module.exports = router; 