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
exports.fotoSolicitante = exports.confirmarVisita = exports.actualizarEstatus = exports.getVisitasPendientes = void 0;
const visita_1 = __importDefault(require("../models/visita"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const solicitante_1 = __importDefault(require("../models/solicitante"));
const domicilio_1 = __importDefault(require("../models/domicilio"));
const getVisitasPendientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const visitas = yield visita_1.default.findAll({
            include: [
                { model: solicitante_1.default, attributes: { exclude: ['foto', 'genero',
                            'edad',
                            'institucion',
                            'grado',
                            'tipoApoyo'] } },
            ],
            where: {
                solicitante_idSolicitante: id,
                confirmacionSolicitante: false
            }
        });
        const domicilio = yield domicilio_1.default.findAll({ where: { idDomicilio: id } });
        if (visitas.length === 0) {
            res.status(400).json('El id: ' + id + ' ya ha sido visitado o no existe');
        }
        else {
            res.json({ visitas, domicilio });
        }
    }
    catch (error) {
        console.error('Error al obtener las visitas pendientes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.getVisitasPendientes = getVisitasPendientes;
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
    const { id } = req.params;
    try {
        const solicitante = yield solicitante_1.default.findByPk(id);
        if (!solicitante) {
            res.status(404).send('Solicitante no encontrado');
            return;
        }
        // Get the photo filename from the solicitante
        let photoFilename;
        if (solicitante.foto instanceof Uint8Array) {
            const buffer = Buffer.from(solicitante.foto); // Convertir Uint8Array a Buffer
            photoFilename = buffer.toString(); // Convertir Buffer a string
        }
        else {
            photoFilename = solicitante.foto; // Tratar 'foto' como string si no es Uint8Array
        }
        if (!photoFilename) {
            res.status(404).send('Foto de solicitante no encontrada');
            return;
        }
        // Construct the photo path
        const photoPath = path_1.default.join(__dirname, '..', 'solicitante-photos', photoFilename);
        // Check if the photo file exists
        if (!fs_1.default.existsSync(photoPath)) {
            res.status(404).send('Foto de solicitante no encontrada');
            return;
        }
        // Send the photo file as a response
        res.sendFile(photoPath);
    }
    catch (error) {
        console.error('Error al obtener la foto del solicitante:', error);
        res.status(500).send('Error interno del servidor');
    }
});
exports.fotoSolicitante = fotoSolicitante;
//# sourceMappingURL=visita.js.map