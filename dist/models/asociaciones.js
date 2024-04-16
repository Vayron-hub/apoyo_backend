"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Visita = exports.Solicitante = exports.Usuario = void 0;
const usuarioM_1 = __importDefault(require("./usuarioM"));
exports.Usuario = usuarioM_1.default;
const solicitante_1 = __importDefault(require("./solicitante"));
exports.Solicitante = solicitante_1.default;
const visita_1 = __importDefault(require("./visita"));
exports.Visita = visita_1.default;
const connection_1 = __importDefault(require("../database/connection")); // Importa la conexión a la base de datos
// Define las asociaciones
usuarioM_1.default.hasOne(solicitante_1.default);
solicitante_1.default.belongsTo(usuarioM_1.default);
visita_1.default.belongsTo(solicitante_1.default, { foreignKey: 'solicitante_idSolicitante' });
visita_1.default.belongsTo(usuarioM_1.default, { foreignKey: 'usuario_idUsuario' });
// Sincroniza las asociaciones con la base de datos
connection_1.default.sync(); // Esto sincronizará las asociaciones con la base de datos al iniciar la aplicación
//# sourceMappingURL=asociaciones.js.map