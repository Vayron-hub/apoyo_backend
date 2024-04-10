import { DataTypes } from 'sequelize';
import db from '../database/connection';

const Solicitante = db.define('Usuario', {

    nombre: {
        type: DataTypes.STRING
    },
    primerApellido: {
        type: DataTypes.STRING
    },
    segundoApellido: {
        type: DataTypes.STRING
    },
    genero: {
        type: DataTypes.STRING
    },
    edad: {
        type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING
    },
});

export default Solicitante;