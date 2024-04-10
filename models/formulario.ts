import { DataTypes } from 'sequelize';
import db from '../database/connection';

const Domicilio = db.define('Usuario', {

    pregunta1: {
        type: DataTypes.STRING
    },
    pregunta2: {
        type: DataTypes.STRING
    },
    pregunta3: {
        type: DataTypes.STRING
    },
    pregunta4: {
        type: DataTypes.STRING
    },
    pregunta5: {
        type: DataTypes.STRING
    },
    pregunta6: {
        type: DataTypes.STRING
    },
    pregunta7: {
        type: DataTypes.STRING
    },
    pregunta8: {
        type: DataTypes.STRING
    },
    pregunta9: {
        type: DataTypes.STRING
    },
    pregunta10: {
        type: DataTypes.STRING
    },
    pregunta11: {
        type: DataTypes.STRING
    },
    pregunta12: {
        type: DataTypes.STRING
    },
    pregunta13: {
        type: DataTypes.STRING
    },
    pregunta14: {
        type: DataTypes.STRING
    },
    pregunta15: {
        type: DataTypes.STRING
    },
    pregunta16: {
        type: DataTypes.STRING
    },
    pregunta17: {
        type: DataTypes.STRING
    },
    solicitante_id: {
        type: DataTypes.NUMBER
    },
    
    
    
});

export default Domicilio;