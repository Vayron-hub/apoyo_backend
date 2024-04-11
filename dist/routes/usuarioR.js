"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { check } = require('express-validator');
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const validarCampos_1 = require("../middlewares/validarCampos");
const usuarioC_1 = require("../controllers/usuarioC");
const router = (0, express_1.Router)();
router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos_1.validarCampos
], auth_1.login);
router.get('/', usuarioC_1.getUsuarios);
router.get('/:id', usuarioC_1.getUsuario);
//? Agregar Solicitante
router.post('/solicitante', [
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
    validarCampos_1.validarCampos
], usuarioC_1.postSolicitante);
//? Agregar USUARIO
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
router.put('/:id', usuarioC_1.putUsuario);
router.delete('/:id', usuarioC_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuarioR.js.map