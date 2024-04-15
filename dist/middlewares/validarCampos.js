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
exports.emailExiste = exports.validarCampos = void 0;
const usuarioM_1 = __importDefault(require("../models/usuarioM"));
const { validationResult } = require('express-validator');
const validarCampos = (req = Request, res = Response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json(errors);
    }
    next();
};
exports.validarCampos = validarCampos;
const emailExiste = (correo) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el correo existe
    const existeEmail = yield usuarioM_1.default.findOne(correo);
    if (existeEmail) {
        throw new Error(`El correo: ${correo}, ya está registrado`);
    }
});
exports.emailExiste = emailExiste;
//# sourceMappingURL=validarCampos.js.map