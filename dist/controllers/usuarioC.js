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
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.postSolicitante = exports.getUsuario = exports.getUsuarios = void 0;
const express_1 = require("express");
const bcryptjs = require('bcryptjs');
const usuarioM_1 = __importDefault(require("../models/usuarioM"));
const solicitante_1 = __importDefault(require("../models/solicitante"));
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
const postSolicitante = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (req = express_1.request, res = express_1.response) {
    const { body } = req;
    try {
        const existeEmail = yield solicitante_1.default.findOne({ where: { correo: body.correo } });
        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe un solicitante con el email ' + body.correo
            });
        }
        const solicitante = new solicitante_1.default(body);
        yield solicitante.save();
        res.json(solicitante);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postSolicitante = postSolicitante;
const postUsuario = (...args_2) => __awaiter(void 0, [...args_2], void 0, function* (req = express_1.request, res = express_1.response) {
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
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuarioM_1.default.findByPk(id);
        if (!usuario) {
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
    if (!usuario) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }
    yield usuario.update({ estatus: 'Inactivo' });
    //? Eliminación destructiva await usuario.destroy();
    res.json({
        msg: 'Usuario con el id: ' + id + ' eliminado'
    });
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarioC.js.map