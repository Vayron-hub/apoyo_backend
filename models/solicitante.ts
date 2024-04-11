import { Model, DataTypes } from 'sequelize';
import db from '../database/connection';

interface SolicitanteAttributes {
    idSolicitante: Number,
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
    genero: string;
    edad: string;
    institucion: string;
    grado: string;
    tipoApoyo: string;
    estatus: string;
    correo: string;
}

export interface SolicitanteInstance
    extends Model<SolicitanteAttributes>,
    SolicitanteAttributes { }

const Solicitante = db.define<SolicitanteInstance>('Solicitante', {
    idSolicitante: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
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
    institucion: {
        type: DataTypes.STRING
    },
    grado: {
        type: DataTypes.STRING
    },
    tipoApoyo: {
        type: DataTypes.STRING
    },
    estatus: {
        type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING
    },
},
    {
        // Opciones del modelo
        tableName: 'solicitante',
        timestamps: false,
        schema: "GeoApoyo"
    });

export default Solicitante;
