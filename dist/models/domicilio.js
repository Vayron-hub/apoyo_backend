"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Domicilio = connection_1.default.define('Domicilio', {
    idDomicilio: {
        type: sequelize_1.DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    calle: {
        type: sequelize_1.DataTypes.STRING
    },
    numeroExterior: {
        type: sequelize_1.DataTypes.STRING
    },
    numeroInterior: {
        type: sequelize_1.DataTypes.STRING
    },
    colonia: {
        type: sequelize_1.DataTypes.STRING
    },
    ciudad: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.STRING
    },
    latitud: {
        type: sequelize_1.DataTypes.STRING
    },
    longitud: {
        type: sequelize_1.DataTypes.STRING
    },
    solicitante_idSolicitante: {
        type: sequelize_1.DataTypes.NUMBER
    },
}, {
    // Opciones del modelo
    tableName: 'domicilio',
    timestamps: false,
    schema: "GeoApoyo"
});
exports.default = Domicilio;
//# sourceMappingURL=domicilio.js.map