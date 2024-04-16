import { request, response } from 'express';
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs'; // Importa bcryptjs como módulo ES6
// import Usuario from '../models/usuarioM';
import Solicitante from '../models/solicitante';
import Domicilio from '../models/domicilio';
import Formulario from '../models/formulario';
import db from '../database/connection';
// import seleccionarVisitadorDisponible from '../controllers/solicitanteController'
import { Usuario } from '../models/asociaciones'; // Importa las asociaciones



//? POST DE SOLICITANTE

//TRAER SOLICITANTES
export const getSolicitantes = async (req: Request, res: Response) => {

    const solicitantes = await Solicitante.findAll();
    

    res.json({ solicitantes});

}

//TRAER UN SOLICITANTE MEDIANTE UN ID
export const getSolicitante = async (req: Request, res: Response) => {

    const { id } = req.params;

    const solicitante = await Solicitante.findByPk(id);

    const domicilioS = await Domicilio.findOne({ where: { solicitante_idSolicitante: id } });

    if (solicitante) {
        res.json({solicitante, domicilioS});
    } else {
        res.status(404).json({
            msg: `No existe un solicitante con el id ${id}`
        })
    }
}

//ACTUALIZAR SOLICITANTE CON SU DOMICILIO
export const putSolicitante = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { upsolicitante, updomicilio } = req.body;

    console.log(updomicilio);
    console.log(upsolicitante);

    try {
        const solicitante = await Solicitante.findByPk(id);
        if (!solicitante || solicitante.estatus == 'IA') {
            return res.status(404).json({
                msg: 'No existe un solicitante con el id ' + id
            });
        }
        await solicitante.update(upsolicitante);


        const domicilio = await Domicilio.findOne({ where: { solicitante_idSolicitante: id } });

        if (!domicilio || domicilio.solicitante_idSolicitante == null) {
            return res.status(404).json({
                msg: 'No existe un solicitante con el id ' + id
            });
        }
        await domicilio.update(updomicilio);

        res.json({
            solicitante,
            domicilio
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}


//ELIMINAR SOLICITATNTE DE MANERA LÓGICA
export const deleteSolicitante = async (req: Request, res: Response) => {

    const { id } = req.params;

    const solicitante = await Solicitante.findByPk(id);
    if (!solicitante || solicitante.estatus == 'IA') {
        return res.status(404).json({
            msg: 'No existe un solicitante con el id ' + id
        });
    }

    await solicitante.update({ estatus: 'IA' });

    res.json({
        msg: 'Solicitante con el id: ' + id + ' eliminado'
    })

}

//GUARDAR SOLICITANTE
export const postSolicitante = async (req: Request, res: Response) => {
    const { solicitante, domicilio, formulario } = req.body;

    console.log(solicitante);
    
    if (!solicitante || !req.file) {
        res.status(400).json('El campo foto en solicitante es requerido');
        return;
    }
    
    const bufferImagen = Buffer.from(req.file.buffer);

    try {
        const resultados = await db.transaction(async (t) => {
            // Convertir la imagen a un Buffer

            // Crear el solicitante con la imagen
            const createSolicitante = await Solicitante.create({
                ...solicitante,
                foto: bufferImagen, // Suponiendo que 'foto' es el campo en la tabla de solicitantes para almacenar la imagen
            }, { transaction: t });

            // Crear el domicilio y formulario asociados
            const createDomicilio = await Domicilio.create({
                ...domicilio,
                solicitante_idSolicitante: createSolicitante.idSolicitante
            }, { transaction: t });

            const createFormulario = await Formulario.create({
                ...formulario,
                solicitante_idSolicitante: createSolicitante.idSolicitante
            }, { transaction: t });

            return {
                createSolicitante,
                createDomicilio,
                createFormulario
            }
        });

        res.send({
            resultados
        });

        // No estoy seguro de qué hace 'seleccionarVisitadorDisponible', así que asegúrate de que esté funcionando como esperas.
        // new seleccionarVisitadorDisponible();

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: error,
        })
    }
}


//APROBAR APOYO DE SOLICITANTE
export const aprobarApoyo = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const { monto } = req.body;

    const solicitante = await Solicitante.findByPk( id );

    if( !solicitante){
        return res.status(404).json({
            msg: `El solicitante con el id: ${ id } no existe`
        })
    }

    await solicitante.update({ estatus: 'Aprobado' });

    await solicitante.update({ tipoApoyo: monto });

    res.json(solicitante);
}


//RECHAZAR APOYO DE SOLICITANTE
export const rechazarApoyo = async( req: Request, res: Response ) => {

    const { id } = req.params;

    const solicitante = await Solicitante.findByPk( id );

    if( !solicitante || solicitante.estatus == 'inactivo'){
        return res.status(404).json({
            msg: `El solicitante con el id: ${ id } no existe`
        })
    }

    await solicitante.update({ estatus: 'Rechazado' });

    await solicitante.update({ tipoApoyo: '0' });

    res.json(solicitante);
}



//* CONTROL DE USUARIOS
export const postUsuario = async (req = request, res = response) => {

    const { body } = req;

    try {

        const existeEmail = await Usuario.findOne({ where: { correo: body.correo } });

        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.correo
            });
        }

        const { contrasenia } = req.body;
        const usuario = new Usuario(body);

        const salt = bcryptjs.genSaltSync();
        usuario.contrasenia = bcryptjs.hashSync(contrasenia, salt);

        await usuario.save();

        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

export const getUsuarios = async (req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();

    res.json({ usuarios });

}

export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Utiliza la asociación definida en la clase 'asociaciones' para cargar el 'Solicitante' asociado
        const usuario = await Usuario.findByPk(id, { include: Solicitante });

        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}



export const putUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const usuario = await Usuario.findByPk(id);
        if (!usuario || usuario.estatus == 'IA') {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }

        await usuario.update(body);

        res.json(usuario);


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}


export const deleteUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);
    if (!usuario || usuario.estatus == 'IA') {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }

    await usuario.update({ estatus: 'IA' });

    //? Eliminación destructiva await usuario.destroy();

    res.json({
        msg: 'Usuario con el id: ' + id + ' eliminado'
    })

}