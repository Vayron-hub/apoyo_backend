"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Visita = connection_1.default.define('Visita', {
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
        type: sequelize_1.DataTypes.NUMBER // Cambiado a DataTypes.NUMBER
    },
    usuarioId: {
        type: sequelize_1.DataTypes.NUMBER // Cambiado a DataTypes.NUMBER
    },
}, {
    // Opciones del modelo
    tableName: 'visita', // Cambiado a 'visita'
    timestamps: false, // Cambiado a false
    schema: "GeoApoyo"
});
exports.default = Visita;
//# sourceMappingURL=visita.js.map