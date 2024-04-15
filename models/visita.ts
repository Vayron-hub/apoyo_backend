import { Model, DataTypes } from 'sequelize';
import db from '../database/connection';
import Solicitante, { SolicitanteInstance } from './solicitante';
import Domicilio from './domicilio';
import Usuario from './usuarioM';

interface VisitaAttributes {
    idVisita: number;
    confirmacionSolicitante: boolean;
    estatus: string;
    Razon: string;
    latitudVisita: string;
    longitudVisita: string;
    fecha: Date;
    hora: string;
    fotoDomicilio: string;
    FotoIdentidicacion: string;
    solicitante_idSolicitante: number;
    domicilio_idDomicilio: number;
    usuario_idUsuario: number;
}

export interface VisitaInstance
    extends Model<VisitaAttributes>,
    VisitaAttributes { }

const Visita = db.define<VisitaInstance>('visita', {
    idVisita: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    confirmacionSolicitante: {
        type: DataTypes.BOOLEAN
    },
    estatus: {
        type: DataTypes.STRING
    },
    Razon: {
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
    FotoIdentidicacion: {
        type: DataTypes.STRING
    },
    solicitante_idSolicitante: {
        type: DataTypes.NUMBER
    },
    domicilio_idDomicilio: {
        type: DataTypes.NUMBER
    },
    usuario_idUsuario: {
        type: DataTypes.NUMBER
    },
}, {
    tableName: 'visita',
    timestamps: false,
    schema: "GeoApoyo"
});

Visita.belongsTo(Solicitante, { foreignKey: 'solicitante_idSolicitante' });
Visita.belongsTo(Domicilio, { foreignKey: 'domicilio_idDomicilio' });
Visita.belongsTo(Usuario, { foreignKey: 'usuario_idUsuario' });

export default Visita;
