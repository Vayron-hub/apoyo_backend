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
exports.fotoSolicitante = exports.confirmarVisita = exports.actualizarEstatus = exports.visitasPendientes = void 0;
const visita_1 = __importDefault(require("../models/visita"));
const solicitante_1 = __importDefault(require("../models/solicitante"));
const domicilio_1 = __importDefault(require("../models/domicilio"));
const visitasPendientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const visitas = yield visita_1.default.findAll({
            where: {
                confirmacionSolicitante: false,
                solicitante_idSolicitante: id
            },
            include: [
                { model: solicitante_1.default },
                { model: domicilio_1.default }
            ]
        });
        res.json(visitas);
    }
    catch (error) {
        console.error('Error al obtener las visitas pendientes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.visitasPendientes = visitasPendientes;
const actualizarEstatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, estatus, Razon, latitud, longitud, fotoCasa } = req.body;
        yield visita_1.default.update({ estatus, Razon, latitudVisita: latitud, longitudVisita: longitud, fotoDomicilio: fotoCasa }, { where: { idVisita: id } });
        res.json({ message: 'Estatus actualizado correctamente' });
    }
    catch (error) {
        console.error('Error al actualizar el estatus de la visita:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.actualizarEstatus = actualizarEstatus;
const confirmarVisita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idSolicitante, idDomicilio, idUsuario, fecha, hora, latitud, longitud } = req.body;
        yield visita_1.default.create({
            idVisita: 0,
            confirmacionSolicitante: true,
            estatus: 'EN',
            Razon: 'encontrado', // Corregido a minúscula para que coincida con la definición del modelo
            fecha: new Date(fecha), // Asegúrate de convertir la fecha a un objeto Date si no lo es
            hora, // No es necesario convertir la hora si ya está en el formato correcto
            latitudVisita: latitud,
            longitudVisita: longitud,
            fotoDomicilio: '...', // Asegúrate de proporcionar una URL válida para la foto
            FotoIdentidicacion: '...', // Asegúrate de proporcionar una URL válida para la foto de identificación
            solicitante_idSolicitante: idSolicitante,
            domicilio_idDomicilio: idDomicilio,
            usuario_idUsuario: idUsuario,
        });
        res.json({ message: 'Visita confirmada correctamente' });
    }
    catch (error) {
        console.error('Error al confirmar la visita:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.confirmarVisita = confirmarVisita;
const fotoSolicitante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        res.json({ message: 'Foto del solicitante correctamente' });
    }
    catch (error) {
        console.error('Error al obtener la foto del solicitante:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.fotoSolicitante = fotoSolicitante;
//# sourceMappingURL=visita.js.map