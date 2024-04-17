import { Request, Response } from 'express';
import Solicitante from '../models/solicitante';
import Usuario from '../models/usuarioM'; // Asegúrate de importar el modelo correcto
import { UsuarioInstance } from '../models/usuarioM';

// class SolicitanteController {
//     async crearSolicitante(req: Request, res: Response) {
//         try {
//             const {idSolicitante, nombre, primerApellido, segundoApellido, genero, edad, institucion, grado, tipoApoyo, estatus, correo } = req.body;
            
//             const nuevoSolicitante = await this.crearNuevoSolicitante({
//                 idSolicitante,
//                 nombre,
//                 primerApellido,
//                 segundoApellido,
//                 genero,
//                 edad,
//                 institucion,
//                 grado,
//                 tipoApoyo,
//                 estatus,
//                 correo
//             });

//             res.status(201).json({ mensaje: 'Solicitante creado exitosamente', solicitante: nuevoSolicitante });
//         } catch (error) {
//             console.error('Error al crear solicitante:', error);
//             res.status(500).json({ mensaje: 'Error interno del servidor' });
//         }
//     }

//     async crearNuevoSolicitante({idSolicitante, nombre, primerApellido, segundoApellido, genero, edad, institucion, grado, tipoApoyo, estatus, correo }: 
//         {idSolicitante: Number, nombre: string; primerApellido: string; segundoApellido: string; genero: string; edad: string; institucion: string; grado: string; tipoApoyo: string; estatus: string; correo: string; }) {
//         try {
//             const nuevoSolicitante = await Solicitante.create({
//                 idSolicitante,
//                 nombre,
//                 primerApellido,
//                 segundoApellido,
//                 genero,
//                 edad,
//                 institucion,
//                 grado,
//                 tipoApoyo,
//                 estatus,
//                 correo
//             });
//             return nuevoSolicitante;
//         } catch (error) {
//             throw new Error(`Error al crear el solicitante: ${error}`);
//         }
//     }

//     async seleccionarVisitadorDisponible(): Promise<UsuarioInstance> {
//         const visitador = await Usuario.findOne({ where: { puesto: 'visitador', estatus: 'AC' } }); // Cambiado de UsuarioM a Usuario
//         if (!visitador) {
//             throw new Error('No hay visitadores disponibles');
//         }
//         return visitador;
//     }
// }

// export default SolicitanteController;
