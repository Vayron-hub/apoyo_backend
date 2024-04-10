import Usuario from "../models/usuarioM";

const { validationResult } = require('express-validator');


export const validarCampos = ( req = Request, res = Response, next: any) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.json(errors);
    }

    next();
}

export const emailExiste = async( correo: any ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne( correo );
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}