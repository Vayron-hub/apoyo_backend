import express from 'express';
import { visitasPendientes, actualizarEstatus, confirmarVisita, fotoSolicitante } from '../controllers/visita';

const router = express.Router();

router.get('/visitasPendientes/:id', visitasPendientes);
router.post('/actualizarEstatus', actualizarEstatus);
router.post('/confirmarVisita', confirmarVisita);
router.get('/fotoSolicitante/:id', fotoSolicitante);


export default router;
