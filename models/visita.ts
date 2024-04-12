import { DataTypes } from 'sequelize';
import db from '../database/connection';

const Visita = db.define('Visita', {
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
    fotoIdentificacion: {
        type: DataTypes.STRING
    },
    SolicitanteId: { // Cambiado a notación camelCase
        type: DataTypes.NUMBER // Cambiado a DataTypes.NUMBER
    },
    usuarioId: { // Cambiado a notación camelCase
        type: DataTypes.NUMBER // Cambiado a DataTypes.NUMBER
    },
}, {
    // Opciones del modelo
    tableName: 'visita', // Cambiado a 'visita'
    timestamps: false, // Cambiado a false
    schema: "GeoApoyo"
});

export default Visita;
