import { Model, DataTypes } from 'sequelize';
import db from '../database/connection';

interface DomicilioAttributes {
    idDomicilio: number,
    calle: string,
    numeroExterior: string,
    numeroInterior: string,
    colonia: string,
    ciudad: string,
    estado: string,
    latitud: string,
    longitud: string,
    solicitanteId: number,
}

export interface DomicilioInstance
    extends Model<DomicilioAttributes>,
    DomicilioAttributes { }

const Domicilio = db.define<DomicilioInstance>('Domicilio', {
    idDomicilio: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    calle: {
        type: DataTypes.STRING
    },
    numeroExterior: {
        type: DataTypes.STRING
    },
    numeroInterior: {
        type: DataTypes.STRING
    },
    colonia: {
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
    solicitanteId: {
        type: DataTypes.NUMBER
    },
},
    {
        // Opciones del modelo
        tableName: 'domicilio',
        timestamps: false,
        schema: "GeoApoyo"
    });

export default Domicilio;
