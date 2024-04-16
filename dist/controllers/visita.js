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
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const visita_1 = __importDefault(require("../models/visita"));
const solicitante_1 = __importDefault(require("../models/solicitante"));
const domicilio_1 = __importDefault(require("../models/domicilio"));
// Configure multer for image uploads
const upload = (0, multer_1.default)({
    dest: 'uploads/', // Temporary upload directory
    fileFilter: (req, file, cb) => {
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        if (!allowedExtensions.includes(path_1.default.extname(file.originalname))) {
            return cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed'));
        }
        cb(null, true);
    }
});
// Get pending visits for a user
const getVisitasPendientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const visitas = yield visita_1.default.findAll({
            where: {
                confirmacionSolicitante: false,
                usuario_idUsuario: id
            },
            include: [{
                    model: solicitante_1.default,
                    include: [domicilio_1.default]
                }]
        });
        res.json(visitas);
    }
    catch (error) {
        console.error('Error al obtener visitas pendientes:', error);
        res.status(500).send('Error interno del servidor');
    }
});
exports.getVisitasPendientes = getVisitasPendientes;
// Update the status of a visit
const actualizarEstatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { estatus, razon, latitud, longitud } = req.body;
    try {
        // Handle image upload using multer
        const file = req.file;
        if (!file) {
            return res.status(400).send('No se ha seleccionado una foto');
        }
        // Generate a unique filename for the image
        const fileName = `${(0, uuid_1.v4)()}${path_1.default.extname(file.originalname)}`;
        const filePath = path_1.default.join(__dirname, '..', 'uploads', fileName);
        // Move the uploaded file to the uploads directory
        fs_1.default.writeFileSync(filePath, file.buffer);
        // Update the visit with all the data
        yield visita_1.default.update({
            estatus,
            razon,
            latitudVisita: latitud,
            longitudVisita: longitud,
            fotoDomicilio: fileName // Use the generated filename
        }, {
            where: { idVisita: id }
        });
        res.send('Estatus de visita actualizado exitosamente');
    }
    catch (error) {
        console.error('Error al actualizar el estatus de la visita:', error);
        res.status(500).send('Error interno del servidor');
    }
});
exports.actualizarEstatus = actualizarEstatus;
// Confirm a visit
const confirmarVisita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { idSolicitante, fecha, hora, latitud, longitud } = req.body;
    try {
        yield visita_1.default.update({
            confirmacionSolicitante: true,
            estatus: 'EN',
            Razon: 'encontrado',
            fecha,
            hora,
            latitudVisita: latitud,
            longitudVisita: longitud
        }, {
            where: { idVisita: id }
        });
        res.send('Visita confirmada exitosamente');
    }
    catch (error) {
        console.error('Error al confirmar la visita:', error);
        res.status(500).send('Error interno del servidor');
    }
});
exports.confirmarVisita = confirmarVisita;
// Get solicitante photo (not implemented yet)
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