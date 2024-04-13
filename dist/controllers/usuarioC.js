"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.getUsuario = exports.getUsuarios = exports.postUsuario = exports.postSolicitante = exports.deleteSolicitante = exports.putSolicitante = exports.getSolicitante = exports.getSolicitantes = void 0;
const express_1 = require("express");
const bcryptjs = require('bcryptjs');
const usuarioM_1 = __importDefault(require("../models/usuarioM"));
const solicitante_1 = __importDefault(require("../models/solicitante"));
const domicilio_1 = __importDefault(require("../models/domicilio"));
const formulario_1 = __importDefault(require("../models/formulario"));
const connection_1 = __importDefault(require("../database/connection"));
const solicitanteController_1 = __importDefault(require("../controllers/solicitanteController"));
//? POST DE SOLICITANTE
//TRAER SOLICITANTES
const getSolicitantes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const solicitantes = yield solicitante_1.default.findAll();
    res.json({ solicitantes });
});
exports.getSolicitantes = getSolicitantes;
//TRAER UN SOLICITANTE MEDIANTE UN ID
const getSolicitante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const solicitante = yield solicitante_1.default.findByPk(id);
    const domicilioS = yield domicilio_1.default.findOne({ where: { solicitante_idSolicitante: id } });
    if (solicitante) {
        res.json({ solicitante, domicilioS });
    }
    else {
        res.status(404).json({
            msg: `No existe un solicitante con el id ${id}`
        });
    }
});
exports.getSolicitante = getSolicitante;
const putSolicitante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { upsolicitante, updomicilio } = req.body;
    console.log(updomicilio);
    console.log(upsolicitante);
    try {
        const solicitante = yield solicitante_1.default.findByPk(id);
        if (!solicitante || solicitante.estatus == 'IA') {
            return res.status(404).json({
                msg: 'No existe un solicitante con el id ' + id
            });
        }
        yield solicitante.update(upsolicitante);
        const domicilio = yield domicilio_1.default.findOne({ where: { solicitante_idSolicitante: id } });
        if (!domicilio || domicilio.solicitante_idSolicitante == null) {
            return res.status(404).json({
                msg: 'No existe un solicitante con el id ' + id
            });
        }
        yield domicilio.update(updomicilio);
        res.json({
            solicitante,
            domicilio
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putSolicitante = putSolicitante;
const deleteSolicitante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const solicitante = yield solicitante_1.default.findByPk(id);
    if (!solicitante || solicitante.estatus == 'IA') {
        return res.status(404).json({
            msg: 'No existe un solicitante con el id ' + id
        });
    }
    yield solicitante.update({ estatus: 'IA' });
    res.json({
        msg: 'Solicitante con el id: ' + id + ' eliminado'
    });
});
exports.deleteSolicitante = deleteSolicitante;
const postSolicitante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Se accede a los valores del request
    const { solicitante, domicilio, formulario } = req.body;
    try {
        //Se inicia una transaccion
        const resultados = yield connection_1.default.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            //Se guarda en base de datos el solicitante
            const createSolicitante = yield solicitante_1.default.create(solicitante, { transaction: t });
            //Se guarda en base de datos el domicilio con la llave foranea de solicitante
            const createDomicilio = yield domicilio_1.default.create(Object.assign(Object.assign({}, domicilio), { solicitante_idSolicitante: createSolicitante.idSolicitante }), { transaction: t });
            //Se guarda en base de datos el formulario con la llave foranea del solicitante
            const createFormulario = yield formulario_1.default.create(Object.assign(Object.assign({}, formulario), { solicitante_idSolicitante: createSolicitante.idSolicitante }), { transaction: t });
            //Se retornan los valores
            return {
                createSolicitante,
                createDomicilio,
                createFormulario
            };
        }));
        res.send({
            resultados
        });
        new solicitanteController_1.default();
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            msg: error,
        });
    }
});
exports.postSolicitante = postSolicitante;
//* CONTROL DE USUARIOS
const postUsuario = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    const { body } = req;
    try {
        const existeEmail = yield usuarioM_1.default.findOne({ where: { correo: body.correo } });
        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.correo
            });
        }
        const { contrasenia } = req.body;
        const usuario = new usuarioM_1.default(body);
        const salt = bcryptjs.genSaltSync();
        usuario.contrasenia = bcryptjs.hashSync(contrasenia, salt);
        yield usuario.save();
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postUsuario = postUsuario;
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuarioM_1.default.findAll();
    res.json({ usuarios });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuarioM_1.default.findByPk(id);
    if (usuario) {
        res.json(usuario);
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
});
exports.getUsuario = getUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuarioM_1.default.findByPk(id);
        if (!usuario || usuario.estatus == 'IA') {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        yield usuario.update(body);
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuarioM_1.default.findByPk(id);
    if (!usuario || usuario.estatus == 'IA') {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }
    yield usuario.update({ estatus: 'IA' });
    //? Eliminación destructiva await usuario.destroy();
    res.json({
        msg: 'Usuario con el id: ' + id + ' eliminado'
    });
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarioC.js.map