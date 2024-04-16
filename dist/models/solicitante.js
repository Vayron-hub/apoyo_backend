"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Solicitante = connection_1.default.define('Solicitante', {
    idSolicitante: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    primerApellido: {
        type: sequelize_1.DataTypes.STRING
    },
    segundoApellido: {
        type: sequelize_1.DataTypes.STRING
    },
    genero: {
        type: sequelize_1.DataTypes.STRING
    },
    edad: {
        type: sequelize_1.DataTypes.STRING
    },
    institucion: {
        type: sequelize_1.DataTypes.STRING
    },
    grado: {
        type: sequelize_1.DataTypes.STRING
    },
    tipoApoyo: {
        type: sequelize_1.DataTypes.STRING
    },
    estatus: {
        type: sequelize_1.DataTypes.STRING
    },
    correo: {
        type: sequelize_1.DataTypes.STRING
    },
    foto: {
        type: sequelize_1.DataTypes.BLOB, // Cambiado a DataTypes.BLOB para representar datos binarios
        allowNull: false // Añadido para evitar valores nulos en la columna 'foto'
    }
}, {
    // Model options
    tableName: 'solicitante',
    timestamps: false,
    schema: 'GeoApoyo'
});
exports.default = Solicitante;
//# sourceMappingURL=solicitante.js.map