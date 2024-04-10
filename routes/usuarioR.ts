const { check } = require('express-validator');
import { Router } from 'express';

import { login } from '../controllers/auth'
import { validarCampos } from '../middlewares/validarCampos';
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from '../controllers/usuarioC';

const router = Router();

router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login );

router.get('/',       getUsuarios);


router.get('/:id',    getUsuario);

router.post('/',      postUsuario);

router.put('/:id',    putUsuario);

router.delete('/:id', deleteUsuario);










export default router;

