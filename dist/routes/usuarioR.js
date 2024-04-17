"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { check } = require('express-validator');
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const auth_1 = require("../controllers/auth");
const validarCampos_1 = require("../middlewares/validarCampos");
const usuarioC_1 = require("../controllers/usuarioC");
const router = (0, express_1.Router)();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
//* RUTAS DE SOLICITANTE
//VER SOLICITANTES
router.get('/solicitantes', usuarioC_1.getSolicitantes);
//VER A UN SOLICITANTE 
router.get('/solicitante/:id', usuarioC_1.getSolicitante);
//APROBAR APOYO
router.put('/aprobar/:id', usuarioC_1.aprobarApoyo);
//RECHAZAR APOYO
router.put('/rechazar/:id', usuarioC_1.rechazarApoyo);
//AGREGAR UN SOLICITANTE
router.post('/solicitante', check('nombre', 'El nombre es obligatorio').not().isEmpty(), check('primerApellido', 'El nombre es obligatorio').not().isEmpty(), check('segundoApellido', 'El nombre es obligatorio').not().isEmpty(), check('genero', 'El nombre es obligatorio').not().isEmpty(), check('edad', 'El nombre es obligatorio').not().isEmpty(), check('institucion', 'El nombre es obligatorio').not().isEmpty(), check('grado', 'El nombre es obligatorio').not().isEmpty(), check('tipoApoyo', 'El nombre es obligatorio').not().isEmpty(), check('estatus', 'El nombre es obligatorio').not().isEmpty(), check('correo', 'El nombre es obligatorio').not().isEmpty(), upload.single('foto'), usuarioC_1.postSolicitante);
//ACTUALIZAR SOLICITANTE
router.put('/AS/:id', usuarioC_1.putSolicitante);
// ELIMINAR SOLICITANTE
router.delete('/BS/:id', usuarioC_1.deleteSolicitante);
//? RUTAS DE USUARIO
//HACER LOGIN CON UN USUARIO
router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos_1.validarCampos
], auth_1.login);
// VER USUARIOS
router.get('/usuarios', usuarioC_1.getUsuarios);
//VER UN SOLO USUARIO
router.get('/usuario/:id', usuarioC_1.getUsuario);
//AGREGAR UN USUARIO
router.post('/usuario', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('primerApellido', 'El apellido paterno es obligatorio').not().isEmpty(),
    check('segundoApellido', 'El apellido materno es obligatorio').not().isEmpty(),
    check('puesto', 'El genero es obligatoria').not().isEmpty(),
    check('fechaContratacion', 'La edad es obligatoria').not().isEmpty(),
    check('sueldo', 'La institución es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').isEmail(),
    check('contrasenia', 'El grado es obligatorio').not().isEmpty(),
    check('estatus', 'El estaus es obligatorio').not().isEmpty(),
    validarCampos_1.validarCampos
], usuarioC_1.postUsuario);
//ACTUALIZAR UN USUARIO
router.put('/AU/:id', usuarioC_1.putUsuario);
//ELIMINAR UN USUARIO
router.delete('/BU/:id', usuarioC_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuarioR.js.map