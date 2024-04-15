import { request, response } from 'express';
import { Request, Response } from 'express';
const bcryptjs = require('bcryptjs');
import Usuario from '../models/usuarioM';
import Solicitante from '../models/solicitante';
import Domicilio from '../models/domicilio';
import Formulario from '../models/formulario';
import db from '../database/connection';
import seleccionarVisitadorDisponible from '../controllers/solicitanteController'



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


export const putSolicitante = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { upsolicitante, updomicilio } = req.body;

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


export const postSolicitante = async (req: Request, res: Response) => {

    //Se accede a los valores del request
    const { solicitante, domicilio, formulario } = req.body;

    try {
        //Se inicia una transaccion
        const resultados = await db.transaction(async (t) => {

            //Se guarda en base de datos el solicitante
            const createSolicitante = await Solicitante.create(solicitante, { transaction: t });

            //Se guarda en base de datos el domicilio con la llave foranea de solicitante
            const createDomicilio = await Domicilio.create({
                ...domicilio,
                solicitante_idSolicitante: createSolicitante.idSolicitante
            }, { transaction: t });

            //Se guarda en base de datos el formulario con la llave foranea del solicitante
            const createFormulario = await Formulario.create({
                ...formulario,
                solicitante_idSolicitante: createSolicitante.idSolicitante
            }, { transaction: t });


            //Se retornan los valores
            return {
                createSolicitante,
                createDomicilio,
                createFormulario
            }
        });

        res.send({
            resultados
        });

        new seleccionarVisitadorDisponible();

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: error,
        })
    }

}

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

    const usuario = await Usuario.findByPk(id);

    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        })
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