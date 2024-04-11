import { request, response } from 'express';
import { Request, Response } from 'express';
const  bcryptjs = require ('bcryptjs');
import Usuario from '../models/usuarioM';
import Solicitante from '../models/solicitante';


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

export const postSolicitante = async (req= request, res= response) => {

    const { body } = req;

    try {

        const existeEmail = await Solicitante.findOne({where:{correo: body.correo}});

        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe un solicitante con el email ' + body.correo
            });
        }

        const solicitante = new Solicitante(body);
        await solicitante.save();

        res.json(solicitante);



    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

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

export const putUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
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
    if (!usuario) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }

    await usuario.update({ estatus: 'Inactivo' });

    //? Eliminación destructiva await usuario.destroy();

    res.json({
        msg: 'Usuario con el id: ' +  id + ' eliminado'
    })

}