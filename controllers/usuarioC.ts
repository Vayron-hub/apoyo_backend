import { request, response } from 'express';
import { Request, Response } from 'express';
const  bcryptjs = require ('bcryptjs');
import Usuario from '../models/usuarioM';
import Solicitante from '../models/solicitante';
import db from '../database/connection';



//? POST DE SOLICITANTE
// export const postSolicitante = async (req= request, res= response) => {
    
//     const { body } = req;
    
//     try {
        
//         const existeEmail = await Solicitante.findOne({where:{correo: body.correo}});
        
//         if (existeEmail) {
//             return res.status(400).json({
//                 msg: 'Ya existe un solicitante con el email ' + body.correo
//             });
//         }
        
//         const solicitante = new Solicitante(body);
//         await solicitante.save();
        
//         res.json(solicitante);
        
        
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             msg: 'Hable con el administrador'
//         });
//     }
// }

export const getSolicitantes = async (req: Request, res: Response) => {

    const solicitantes = await Solicitante.findAll();

    res.json({ solicitantes });

}

export const getSolicitante = async (req: Request, res: Response) => {

    const { id } = req.params;

    const solicitante = await Solicitante.findByPk(id);

    if (solicitante) {
        res.json(solicitante);
    } else {
        res.status(404).json({
            msg: `No existe un solicitante con el id ${id}`
        })
    }
}


export const putSolicitante = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const solicitante = await Solicitante.findByPk(id);
        if (!solicitante || solicitante.estatus == 'IA') {
            return res.status(404).json({
                msg: 'No existe un solicitante con el id ' + id
            });
        }

        await solicitante.update(body);

        res.json(solicitante);


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
        msg: 'Solicitante con el id: ' +  id + ' eliminado'
    })

}


export const postSolicitante = async(req: Request, res: Response) => {

    //Se accede a los valores del request
    const {solicitante, domicilio, formulario} = req.body;

    try{
        //Se inicia una transaccion
        const resultados = await db.transaction(async(t) => {

            //Se guarda en base de datos el solicitante
            const createSolicitante = await Solicitante.create(solicitante, {transaction: t});

            //Se guarda en base de datos el domicilio con la llave foranea de solicitante
            const createDomicilio = await domicilio.create({
                ...domicilio,
                solicitante_idSolicitante: createSolicitante.idSolicitante
            }, {transaction: t});

            //Se guarda en base de datos el formulario con la llave foranea del solicitante
            const createFormulario = await formulario.create({
                ...formulario,
                solicitante_idSolicitante: createSolicitante.idSolicitante
            }, {transaction: t});


            //Se retornan los valores
            return {
                createSolicitante,
                createDomicilio,
                createFormulario
            }


        });
        res.send({
            resultados
        })

    }catch(e){
        res.status(500).send({
            msg: e
        })
    }

}


//* CONTROL DE USUARIOS
export const postUsuario = async (req= request, res= response) => {
    
    const { body } = req;
    
    try {
        
        const existeEmail = await Usuario.findOne({where:{correo: body.correo}});
        
        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.correo
            });
        }
        
        const { contrasenia } = req.body;
        const usuario = new Usuario(body);
        
        const salt = bcryptjs.genSaltSync();
        usuario.contrasenia = bcryptjs.hashSync( contrasenia, salt );
        
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
        msg: 'Usuario con el id: ' +  id + ' eliminado'
    })

}