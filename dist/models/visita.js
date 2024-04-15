"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const solicitante_1 = __importDefault(require("./solicitante"));
const domicilio_1 = __importDefault(require("./domicilio"));
const usuarioM_1 = __importDefault(require("./usuarioM"));
const Visita = connection_1.default.define('Visita', {
    idVisita: {
        type: sequelize_1.DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    confirmacionSolicitante: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    estatus: {
        type: sequelize_1.DataTypes.STRING
    },
    razon: {
        type: sequelize_1.DataTypes.STRING
    },
    latitudVisita: {
        type: sequelize_1.DataTypes.STRING
    },
    longitudVisita: {
        type: sequelize_1.DataTypes.STRING
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE
    },
    hora: {
        type: sequelize_1.DataTypes.TIME
    },
    fotoDomicilio: {
        type: sequelize_1.DataTypes.STRING
    },
    fotoIdentificacion: {
        type: sequelize_1.DataTypes.STRING
    },
    SolicitanteId: {
        type: sequelize_1.DataTypes.NUMBER
    },
    usuarioId: {
        type: sequelize_1.DataTypes.NUMBER
    },
}, {
    tableName: 'visita',
    timestamps: false,
    schema: "GeoApoyo"
});
Visita.belongsTo(solicitante_1.default, { foreignKey: 'solicitante_idSolicitante' });
Visita.belongsTo(domicilio_1.default, { foreignKey: 'domicilio_idDomicilio' });
Visita.belongsTo(usuarioM_1.default, { foreignKey: 'usuario_idUsuario' });
exports.default = Visita;
//# sourceMappingURL=visita.js.map