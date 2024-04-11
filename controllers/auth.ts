const { response, request } = require('express');
const bcryptjs = require('bcryptjs')

import Usuario, { UsuarioInstance } from "../models/usuarioM";

const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');


export const login = async (req= request, res= response) => {

    const { correo, password } = req.body;

    try {
        const usuario: UsuarioInstance | null = await Usuario.findOne({
            where: { correo }
        });

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        if (!usuario.estatus) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        const validPassword = bcryptjs.compareSync(
            password,
            usuario.contrasenia
        );
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        res.json({
            usuario,
            token: 'token'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
};



