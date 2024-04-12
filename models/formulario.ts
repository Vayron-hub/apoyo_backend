import { Model, DataTypes } from 'sequelize';
import db from '../database/connection';

interface EncuestaAttributes {
    idEncuesta: number,
    pregunta1: string,
    pregunta2: string,
    pregunta3: string,
    pregunta4: string,
    pregunta5: string,
    pregunta6: string,
    pregunta7: string,
    pregunta8: string,
    pregunta9: string,
    pregunta10: string,
    pregunta11: string,
    pregunta12: string,
    pregunta13: string,
    pregunta14: string,
    pregunta15: string,
    pregunta16: string,
    pregunta17: string,
    solicitanteId: number,
}

export interface EncuestaInstance
    extends Model<EncuestaAttributes>,
    EncuestaAttributes { }

const Encuesta = db.define<EncuestaInstance>('Encuesta', {
    idEncuesta: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
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
    solicitanteId: {
        type: DataTypes.NUMBER
    },
},
    {
        // Opciones del modelo
        tableName: 'encuesta',
        timestamps: false,
        schema: "GeoApoyo"
    });

export default Encuesta;
