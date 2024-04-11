import { Model, DataTypes } from 'sequelize';
import db from '../database/connection';

interface UsuarioAttributes {
    idUsuario: Number,
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
    puesto: string;
    fechaContratacion: string;
    sueldo: string;
    correo: string;
    contrasenia: string;
    estatus: String;
}

export interface UsuarioInstance
    extends Model<UsuarioAttributes>,
    UsuarioAttributes { }

const Usuario = db.define<UsuarioInstance>('usuario', {
    idUsuario: {
        type: DataTypes.NUMBER,
        primaryKey: true
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
    puesto: {
        type: DataTypes.STRING
    },
    fechaContratacion: {
        type: DataTypes.STRING
    },
    sueldo: {
        type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING
    },
    contrasenia: {
        type: DataTypes.STRING
    },
    estatus: {
        type: DataTypes.STRING,
        defaultValue: 'AC'
    },
},
    {
        // Opciones del modelo
        tableName: 'usuario', // Reemplaza esto con el nombre real de tu tabla
        timestamps: false,
        schema: "GeoApoyo"
    });

export default Usuario;
