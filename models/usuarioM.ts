import { DataTypes } from 'sequelize';
import db from '../database/connection';

const Usuario = db.define('Usuario', {
    nombre: {
        type: DataTypes.STRING
    },
    primerApellido: {
        type: DataTypes.STRING
    },
    segundoApellido : {
        type: DataTypes.STRING
    },
    puesto: {
        type: DataTypes.STRING
    },
    fechaContratacion: {
        type: DataTypes.STRING
    },
    sueldo: {
        type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING
    },
    contrasenia: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'AC'
    },
} );


export default Usuario;