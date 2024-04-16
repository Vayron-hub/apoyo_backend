import express from 'express';
import { getVisitasPendientes, actualizarEstatus, confirmarVisita, fotoSolicitante } from '../controllers/visita';

const router = express.Router();

router.get('/visitasPendientes/:id', getVisitasPendientes);
router.post('/actualizarEstatus', actualizarEstatus);
router.post('/confirmarVisita', confirmarVisita);
router.get('/fotoSolicitante/:id', fotoSolicitante);


export default router;
