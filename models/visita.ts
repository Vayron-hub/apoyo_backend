import { DataTypes } from 'sequelize';
import db from '../database/connection';

const Visita = db.define('Usuario', {

    confirmacionSolicitante: {
        type: DataTypes.BOOLEAN
    },
    estatus: {
        type: DataTypes.STRING
    },
    razon: {
        type: DataTypes.STRING
    },
    latitudVisita: {
        type: DataTypes.STRING
    },
    longitudVisita: {
        type: DataTypes.STRING
    },
    fecha: {
        type: DataTypes.DATE
    },
    hora: {
        type: DataTypes.TIME
    },
    fotoDomicilio: {
        type: DataTypes.STRING
    },
    FotoIdentificacion: {
        type: DataTypes.STRING
    },
    Solicitante_id: {
        type: DataTypes.NUMBER
    },
    usuario_id: {
        type: DataTypes.NUMBER
    },
});

export default Visita;