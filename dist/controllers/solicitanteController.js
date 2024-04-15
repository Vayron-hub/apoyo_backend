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
const solicitante_1 = __importDefault(require("../models/solicitante"));
const usuarioM_1 = __importDefault(require("../models/usuarioM")); // Asegúrate de importar el modelo correcto
class SolicitanteController {
    crearSolicitante(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idSolicitante, nombre, primerApellido, segundoApellido, genero, edad, institucion, grado, tipoApoyo, estatus, correo } = req.body;
                const nuevoSolicitante = yield this.crearNuevoSolicitante({
                    idSolicitante,
                    nombre,
                    primerApellido,
                    segundoApellido,
                    genero,
                    edad,
                    institucion,
                    grado,
                    tipoApoyo,
                    estatus,
                    correo
                });
                res.status(201).json({ mensaje: 'Solicitante creado exitosamente', solicitante: nuevoSolicitante });
            }
            catch (error) {
                console.error('Error al crear solicitante:', error);
                res.status(500).json({ mensaje: 'Error interno del servidor' });
            }
        });
    }
    crearNuevoSolicitante(_a) {
        return __awaiter(this, arguments, void 0, function* ({ idSolicitante, nombre, primerApellido, segundoApellido, genero, edad, institucion, grado, tipoApoyo, estatus, correo }) {
            try {
                const nuevoSolicitante = yield solicitante_1.default.create({
                    idSolicitante,
                    nombre,
                    primerApellido,
                    segundoApellido,
                    genero,
                    edad,
                    institucion,
                    grado,
                    tipoApoyo,
                    estatus,
                    correo
                });
                return nuevoSolicitante;
            }
            catch (error) {
                throw new Error(`Error al crear el solicitante: ${error}`);
            }
        });
    }
    seleccionarVisitadorDisponible() {
        return __awaiter(this, void 0, void 0, function* () {
            const visitador = yield usuarioM_1.default.findOne({ where: { puesto: 'visitador', estatus: 'AC' } }); // Cambiado de UsuarioM a Usuario
            if (!visitador) {
                throw new Error('No hay visitadores disponibles');
            }
            return visitador;
        });
    }
}
exports.default = SolicitanteController;
//# sourceMappingURL=solicitanteController.js.map