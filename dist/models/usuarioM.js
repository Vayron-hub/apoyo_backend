"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Usuario = connection_1.default.define('usuario', {
    idUsuario: {
        type: sequelize_1.DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true
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
    puesto: {
        type: sequelize_1.DataTypes.STRING
    },
    fechaContratacion: {
        type: sequelize_1.DataTypes.STRING
    },
    sueldo: {
        type: sequelize_1.DataTypes.STRING
    },
    correo: {
        type: sequelize_1.DataTypes.STRING
    },
    contrasenia: {
        type: sequelize_1.DataTypes.STRING
    },
    estatus: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'AC'
    },
}, {
    // Opciones del modelo
    tableName: 'usuario', // Reemplaza esto con el nombre real de tu tabla
    timestamps: false,
    schema: "GeoApoyo"
});
exports.default = Usuario;
//# sourceMappingURL=usuarioM.js.map