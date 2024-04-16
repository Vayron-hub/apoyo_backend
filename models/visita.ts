import { DataTypes } from 'sequelize';
import db from '../database/connection';
import Solicitante from './solicitante'; 
import Domicilio from './domicilio';
import Usuario from './usuarioM'; 


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
    solicitante_idSolicitante: {
        type: DataTypes.NUMBER
    },
    usuario_idUsuario: {
        type: DataTypes.NUMBER
    },
},
    {
        // Opciones del modelo
        tableName: 'visita',
        timestamps: false,
        schema: "GeoApoyo"

    });
Visita.belongsTo(Solicitante, { foreignKey: 'solicitante_idSolicitante' });
Visita.belongsTo(Domicilio, { foreignKey: 'idDomicilio' });
Visita.belongsTo(Usuario, { foreignKey: 'usuario_idUsuario' });

export default Visita;