const { check } = require('express-validator');
import { Router } from 'express';
import multer from 'multer';
import { login } from '../controllers/auth'
import { validarCampos, emailExiste } from '../middlewares/validarCampos';
import {
    deleteUsuario,
    getUsuario,
    getUsuarios,
    getSolicitante,
    getSolicitantes,
    postSolicitante,
    postUsuario,
    putUsuario,
    putSolicitante,
    deleteSolicitante,
    aprobarApoyo,
    rechazarApoyo
} from '../controllers/usuarioC';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//* RUTAS DE SOLICITANTE
//VER SOLICITANTES
router.get('/solicitantes', getSolicitantes);

//VER A UN SOLICITANTE 
router.get('/solicitante/:id', getSolicitante);

//APROBAR APOYO
router.put('/aprobar/:id', aprobarApoyo);

//RECHAZAR APOYO
router.put('/rechazar/:id', rechazarApoyo);

//AGREGAR UN SOLICITANTE
router.post('/solicitante',
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('primerApellido', 'El nombre es obligatorio').not().isEmpty(),
    check('segundoApellido', 'El nombre es obligatorio').not().isEmpty(),
    check('genero', 'El nombre es obligatorio').not().isEmpty(),
    check('edad', 'El nombre es obligatorio').not().isEmpty(),
    check('institucion', 'El nombre es obligatorio').not().isEmpty(),
    check('grado', 'El nombre es obligatorio').not().isEmpty(),
    check('tipoApoyo', 'El nombre es obligatorio').not().isEmpty(),
    check('estatus', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El nombre es obligatorio').not().isEmpty(),
    upload.single('foto'),
    postSolicitante);

//ACTUALIZAR SOLICITANTE
router.put('/AS/:id', putSolicitante);
// ELIMINAR SOLICITANTE
router.delete('/BS/:id', deleteSolicitante);


//? RUTAS DE USUARIO

//HACER LOGIN CON UN USUARIO
router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

// VER USUARIOS
router.get('/usuarios', getUsuarios);

//VER UN SOLO USUARIO
router.get('/usuario/:id', getUsuario);

//AGREGAR UN USUARIO
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

//ACTUALIZAR UN USUARIO
router.put('/AU/:id', putUsuario);

//ELIMINAR UN USUARIO
router.delete('/BU/:id', deleteUsuario);

export default router;

