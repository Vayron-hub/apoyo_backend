const { check } = require('express-validator');
import { Router } from 'express';

import { login } from '../controllers/auth'
import { validarCampos, emailExiste } from '../middlewares/validarCampos';
import { deleteUsuario, getUsuario, getUsuarios, postSolicitante, postUsuario, putUsuario } from '../controllers/usuarioC';

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.get('/', getUsuarios);


router.get('/:id', getUsuario);

    //? Agregar Solicitante
router.post('/solicitante',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('primerApellido', 'El apellido paterno es obligatorio').not().isEmpty(),
        check('segundoApellido', 'El apellido materno es obligatorio').not().isEmpty(),
        check('genero', 'El genero es obligatoria').not().isEmpty(),
        check('edad', 'La edad es obligatoria').not().isEmpty(),
        check('institucion', 'La institución es obligatorio').not().isEmpty(),
        check('grado', 'El grado es obligatorio').not().isEmpty(),
        check('tipoApoyo', '}El tipo de apoyo es obligatorio').not().isEmpty(),
        check('estatus', 'El estaus es obligatorio').not().isEmpty(),
        check('correo', 'El correo es obligatorio').isEmail(),
        validarCampos
    ],
    postSolicitante);

    //? Agregar USUARIO
router.post('/usuario',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('primerApellido', 'El apellido paterno es obligatorio').not().isEmpty(),
        check('segundoApellido', 'El apellido materno es obligatorio').not().isEmpty(),
        check('puesto', 'El genero es obligatoria').not().isEmpty(),
        check('fechaContratacion', 'La edad es obligatoria').not().isEmpty(),
        check('sueldo', 'La institución es obligatorio').not().isEmpty(),
        check('correo', 'El correo es obligatorio').isEmail(),
        check('contrasenia', 'El grado es obligatorio').not().isEmpty(),
        check('estatus', 'El estaus es obligatorio').not().isEmpty(),
        validarCampos
    ],
    postUsuario);

router.put('/:id', putUsuario);

router.delete('/:id', deleteUsuario);










export default router;

