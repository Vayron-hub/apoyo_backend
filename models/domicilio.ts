import { DataTypes } from 'sequelize';
import db from '../database/connection';

const Domicilio = db.define('Usuario', {

    calle: {
        type: DataTypes.STRING
    },
    numeroExterior: {
        type: DataTypes.STRING
    },
    numeroInterior: {
        type: DataTypes.STRING
    },
    colonia : {
        type: DataTypes.STRING
    },
    ciudad: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    },
    latitud: {
        type: DataTypes.STRING
    },
    
    longitud: {
        type: DataTypes.STRING
    },
    solicitante_id: {
        type: DataTypes.NUMBER
    },
});

export default Domicilio;