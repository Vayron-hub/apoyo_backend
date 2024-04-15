"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Formulario = connection_1.default.define('Formulario', {
    idFormulario: {
        type: sequelize_1.DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    pregunta1: {
        type: sequelize_1.DataTypes.STRING
    },
    pregunta2: {
        type: sequelize_1.DataTypes.STRING
    },
    pregunta3: {
        type: sequelize_1.DataTypes.STRING
    },
    pregunta4: {
        type: sequelize_1.DataTypes.STRING
    },
    pregunta5: {
        type: sequelize_1.DataTypes.STRING
    },
    pregunta6: {
        type: sequelize_1.DataTypes.STRING
    },
    pregunta7: {
        type: sequelize_1.DataTypes.STRING
    },
    pregunta8: {
        type: sequelize_1.DataTypes.STRING
    },
    pregunta9: {
        type: sequelize_1.DataTypes.STRING
    },
    pregunta10: {
        type: sequelize_1.DataTypes.STRING
    },
    pregunta11: {
        type: sequelize_1.DataTypes.STRING
    },
    pregunta12: {
        type: sequelize_1.DataTypes.STRING
    },
    pregunta13: {
        type: sequelize_1.DataTypes.STRING
    },
    pregunta14: {
        type: sequelize_1.DataTypes.STRING
    },
    pregunta15: {
        type: sequelize_1.DataTypes.STRING
    },
    pregunta16: {
        type: sequelize_1.DataTypes.STRING
    },
    pregunta17: {
        type: sequelize_1.DataTypes.STRING
    },
    solicitante_idSolicitante: {
        type: sequelize_1.DataTypes.NUMBER
    },
}, {
    // Opciones del modelo
    tableName: 'formulario',
    timestamps: false,
    schema: "GeoApoyo"
});
exports.default = Formulario;
//# sourceMappingURL=formulario.js.map